import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repo';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryService } from '../shared/services/cloudinary.service'; // Check lại path
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CloudinaryService, ConfigService],
})
export class ProductModule {}