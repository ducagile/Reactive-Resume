import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/enums/roles.enum";
import { Role } from "../auth/decorators/roles.decorator";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AdminService } from "./admin.service";
import { PaginationQueryDto, paginationQueryResumeDto } from "./dtos/pagination.dto";
import { Response } from "express";

@ApiTags("Admin")
@Controller("admin")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@ApiCookieAuth()
export class AdminController {
  /**
   * contructor
   */
  constructor(
    /**
     * inject admin service
     */
    private readonly adminService: AdminService,
  ) {}

  /**
   * get all users
   */
  @Get("/users")
  @Role([Roles.ADMIN])
  @UseGuards(TwoFactorGuard, RolesGuard)
  @ApiOperation({
    summary: "get all users",
    description: "Get all users (name email number of cv) param(page pageSize search)",
  })
  async getUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.adminService.getUsers(paginationDto);
  }

  /**
   * download user
   */
  @Get("/users/download")
  @Role([Roles.ADMIN])
  @UseGuards(TwoFactorGuard, RolesGuard)
  @ApiOperation({
    summary: "download list users",
  })
  async downloadUser(@Res() res: Response) {
    const buffer = await this.adminService.downloadUsers();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.attachment(`list-users${Date.now()}.xlsx`); // name file
    res.end(buffer);
  }

  /**
   * get list cv
   */
  @Get("/resumes")
  @Role([Roles.ADMIN])
  @UseGuards(TwoFactorGuard, RolesGuard)
  @ApiOperation({
    summary: "get list resumes",
  })
  async getListResumes(@Query() paginationDto: paginationQueryResumeDto) {
    return await this.adminService.getListResumes(paginationDto);
  }

  /**
   * get a cv
   */
  @Get(`/resumes/:identify`)
  @Role([Roles.ADMIN])
  @UseGuards(TwoFactorGuard, RolesGuard)
  @ApiOperation({
    summary: "get a resume by id or slug",
  })
  async findOneResume(@Param("identify") identify: string) {
    return this.adminService.findOneResume(identify);
  }
}
