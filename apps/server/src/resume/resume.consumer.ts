import * as fs from "node:fs";

import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

import { ResumeService } from "./resume.service";

@Processor("resume", { concurrency: 5 })
export class ResumeProcessor extends WorkerHost {
  constructor(private readonly resumeService: ResumeService) {
    super();
  }

  async process(job: Job<{ filePath: string; resumeId: string }>) {
    const { filePath, resumeId } = job.data;
    console.log(`ResumeProcessor received job: ${job.name}, ${filePath}, ${resumeId}`);
    if (job.name === "convertPdf") {
      await this.resumeService.handleUpload(resumeId, filePath);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file ${filePath}:`, err);
      });
    } else {
      console.warn(`⚠️ Unknown job name: ${job.name}`);
    }
  }
}
