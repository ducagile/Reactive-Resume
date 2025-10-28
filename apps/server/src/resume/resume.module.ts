import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { PrinterModule } from "@/server/printer/printer.module";

import { GenaiService } from "../genai/genai.service";
import { QueueModule } from "../queue/queue.module";
import { StorageModule } from "../storage/storage.module";
import { ResumeProcessor } from "./resume.consumer";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, QueueModule],
  controllers: [ResumeController],
  providers: [ResumeService, GenaiService, ResumeProcessor],
  exports: [ResumeService],
})
export class ResumeModule {}
