import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { envConfig } from './shared/config';

// 1. Tạo biến để lưu instance của ứng dụng
let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ZodValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors();

    const port = envConfig.port || 8080;

    // Chỉ listen nếu chạy ở máy local (Development)
    if (process.env.NODE_ENV !== 'production') {
      await app.listen(port);
      console.log(`🚀 Local server: http://localhost:${port}/api`);
    } else {
      // Bắt buộc phải gọi init() trên môi trường Serverless (Vercel)
      await app.init();
    }
  }
  return app.getHttpAdapter().getInstance();
}

// 2. Tự chạy bootstrap khi ở local
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// 3. QUAN TRỌNG NHẤT: Export default hàm bootstrap để Vercel nhận diện
export default bootstrap;