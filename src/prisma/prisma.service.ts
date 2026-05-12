import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      // Không dùng await trực tiếp ở đây để tránh làm treo quá trình khởi tạo app
      this.$connect()
        .then(() => console.log('✅ MongoDB Connected Successfully'))
        .catch((err) => console.error('❌ MongoDB Connection Error:', err));
    } catch (error) {
      console.error('❌ Prisma Init Error:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}