import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import {
  defaultMetadata,
  defaultResumeData,
  defaultWorkStatus,
  ResumeData,
  resumeDataSchema,
} from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { ErrorMessage, generateRandomName, kebabCase } from "@reactive-resume/utils";
import deepmerge from "deepmerge";
import { jsonrepair } from "jsonrepair";
import { PrismaService } from "nestjs-prisma";

import { PrinterService } from "@/server/printer/printer.service";

import { GenaiService } from "../genai/genai.service";
import { StorageService } from "../storage/storage.service";
import { toInnerHtml } from "./utils/to-html-inner";
import { transformZodJson } from "./utils/transform-zod-json";

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
    private readonly genaiService: GenaiService,
  ) {}

  async create(userId: string, createResumeDto: CreateResumeDto) {
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const data = deepmerge(defaultResumeData, {
      basics: { name, email, picture: { url: picture ?? "" } },
    } satisfies DeepPartial<ResumeData>);

    return this.prisma.resume.create({
      data: {
        data,
        userId,
        title: createResumeDto.title,
        visibility: createResumeDto.visibility,
        slug: createResumeDto.slug ?? kebabCase(createResumeDto.title),
      },
    });
  }

  import(userId: string, importResumeDto: ImportResumeDto) {
    const randomTitle = generateRandomName();

    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: importResumeDto.data,
        title: importResumeDto.title ?? randomTitle,
        slug: importResumeDto.slug ?? kebabCase(randomTitle),
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
    }

    return this.prisma.resume.findUniqueOrThrow({ where: { id } });
  }

  async findOneStatistics(id: string) {
    const result = await this.prisma.statistics.findFirst({
      select: { views: true, downloads: true },
      where: { resumeId: id },
    });

    return {
      views: result?.views ?? 0,
      downloads: result?.downloads ?? 0,
    };
  }

  async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { user: { username }, slug, visibility: "public" },
    });

    // Update statistics: increment the number of views by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 1, downloads: 0, resumeId: resume.id },
        update: { views: { increment: 1 } },
      });
    }

    return resume;
  }

  async update(userId: string, id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const { locked } = await this.prisma.resume.findUniqueOrThrow({
        where: { id },
        select: { locked: true },
      });

      if (locked) throw new BadRequestException(ErrorMessage.ResumeLocked);

      return await this.prisma.resume.update({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as unknown as Prisma.JsonObject,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      if (error.code === "P2025") {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  lock(userId: string, id: string, set: boolean) {
    return this.prisma.resume.update({
      data: { locked: set },
      where: { userId_id: { userId, id } },
    });
  }

  async remove(userId: string, id: string) {
    await Promise.all([
      // Remove files in storage, and their cached keys
      this.storageService.deleteObject(userId, "resumes", id),
      this.storageService.deleteObject(userId, "previews", id),
    ]);

    return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
  }

  async printResume(resume: ResumeDto, userId?: string) {
    const url = await this.printerService.printResume(resume);
    // Update statistics: increment the number of downloads by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });
    }

    return url;
  }

  printPreview(resume: ResumeDto) {
    return this.printerService.printPreview(resume);
  }

  async handleUpload(str: string) {
    const json = await this.genaiService.convertResumeToJson(str);
    const repaired = jsonrepair(json);
    const data1 = JSON.parse(repaired);
    const transformData = transformZodJson({
      ...data1,
      workStatus: defaultWorkStatus,
      metadata: defaultMetadata,
    });
    return transformData;
  }

  async upload(str: string, title: string, userId: string) {
    const data = await this.handleUpload(str);
    let schemaData = data;
    const result1 = resumeDataSchema.safeParse(data);
    if (result1.error?.errors)
      schemaData = {
        ...(schemaData as ResumeData),
        sections: {
          ...(schemaData as ResumeData).sections,
          custom: {},
        },
      };
    const result2 = resumeDataSchema.safeParse(schemaData);
    if (result2.error?.errors)
      throw new HttpException(
        `The input data is invalid. Please try again.: \n${JSON.stringify(result2.error.errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: toInnerHtml(schemaData as ResumeData) as InputJsonValue,
        title: title,
        slug: kebabCase(title),
      },
    });
  }
}
