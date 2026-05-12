import { Module } from '@nestjs/common';
import { ImportsService } from './import.service';
import { ImportsController } from './import.controller';
import { ImportsRepository } from './import.repo';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], // Giữ nguyên
  controllers: [ImportsController],
  providers: [ImportsService, ImportsRepository],
})
export class ImportModule {}