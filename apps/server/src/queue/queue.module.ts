import { BullModule } from "@nestjs/bullmq";
import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger("QueueModule");

        const host = configService.get("REDIS_HOST") ?? "localhost";
        const port = Number(configService.get("REDIS_PORT") ?? 6379);
        const password = configService.get("REDIS_PASSWORD") ?? "redis";

        logger.debug(`Connecting to Redis at ${host}:${port}`);

        return {
          connection: {
            host,
            port,
            password,
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: "resume",
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
