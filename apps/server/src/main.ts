import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { patchNestJsSwagger } from "nestjs-zod";

import { AppModule } from "./app.module";
import { Config } from "./config/schema";

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
  });
  const configService = app.get(ConfigService<Config>);

  // Cookie Parser
  app.use(cookieParser());

  const isProduction = configService.get("NODE_ENV") === "production";
  // CORS
  app.enableCors({
    credentials: true,
    // origin: isProduction
    //   ? ["https://cv.techhub.asia", "https://reactive-resume-admin-antdesign-pro.vercel.app"]
    //   : true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // Helmet - enabled only in production
  if (isProduction) {
    app.use(helmet({ contentSecurityPolicy: false }));
  }

  // Global Prefix
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  // Enable Shutdown Hooks
  app.enableShutdownHooks();

  // Swagger (OpenAPI Docs)
  // This can be accessed by visiting {SERVER_URL}/api/docs
  const config = new DocumentBuilder()
    .setTitle("Talent Hub")
    .setDescription(
      "Talent Hub is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3.",
    )
    .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
    .setVersion("4.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Port
  const port = configService.get<number>("PORT") ?? 3000;

  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port}`, "Bootstrap");
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
