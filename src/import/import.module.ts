import { Module } from '@nestjs/common';
import { ImportsService } from './import.service';
import { ImportsController } from './import.controller';
import { ImportsRepository } from './imports.repo';
// SỬA DÒNG NÀY: Dùng đường dẫn tương đối (.. là lùi ra src, rồi vào prisma)
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], // Giữ nguyên
  controllers: [ImportsController],
  providers: [ImportsService, ImportsRepository],
})
export class ImportModule {}