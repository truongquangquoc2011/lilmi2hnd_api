import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { envConfig } from './shared/config';

let app;

async function bootstrap() {
  try {
    if (!app) {
      console.log('🚀 [Bootstrap] Đang khởi tạo NestFactory...');
      app = await NestFactory.create(AppModule);

      app.useGlobalPipes(new ZodValidationPipe());
      app.setGlobalPrefix('api');
      app.enableCors();

      console.log('⏳ [Bootstrap] Đang gọi app.init()...');
      await app.init();
      console.log('✅ [Bootstrap] Khởi tạo thành công!');
    }
    return app.getHttpAdapter().getInstance();
  } catch (error) {
    console.error('❌ [Bootstrap] LỖI KHỞI CHẠY:', error.message);
    console.error('❌ [Bootstrap] Chi tiết:', error.stack);
    throw error;
  }
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

export default bootstrap;
