import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { envConfig } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api');

  const port = envConfig.port || 8080;

  await app.listen(port);

  console.log(
    `🚀 Server lilmi.2HAND đang chạy tại: http://localhost:${port}/api`,
  );
}

bootstrap();