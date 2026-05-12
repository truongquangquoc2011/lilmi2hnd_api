import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { envConfig } from './shared/config';

// 1. Export hàm bootstrap
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors(); // Thêm cái này cho chắc

  const port = envConfig.port || 8080;

  // 2. CHỈ listen nếu chạy ở máy local
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(port);
    console.log(`🚀 Local server: http://localhost:${port}/api`);
  }

  await app.init();
  return app.getHttpAdapter().getInstance(); // Export instance cho Vercel
}

// 3. Tự chạy khi ở local
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}