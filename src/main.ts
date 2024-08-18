import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApiConf } from "./common/types/config-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiConf = configService.get<ApiConf>("apiConf")!;
  const appLog = new Logger("AppLogger");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: apiConf.corsConfig.allowOrigin,
    methods: apiConf.corsConfig.allowMethods,
  });

  await app.listen(apiConf.listenPort);
  appLog.verbose(`Server is running on ${apiConf.apiUrl}`);
}

bootstrap();
