import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // Bật hết log để soi lỗi
    });
  }

  async onModuleInit() {
    console.log('📡 [Prisma] Đang thử kết nối tới MongoDB...');
    try {
      // Đặt timeout 5 giây cho việc kết nối, nếu lâu hơn sẽ báo lỗi ngay thay vì xoay vòng
      await Promise.race([
        this.$connect(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connect Timeout')), 5000))
      ]);
      console.log('✅ [Prisma] Kết nối Database thành công!');
    } catch (error) {
      console.error('❌ [Prisma] LỖI KẾT NỐI:', error.message);
      // Không dùng throw ở đây để app NestJS vẫn khởi động được và trả về log cho bạn xem
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}