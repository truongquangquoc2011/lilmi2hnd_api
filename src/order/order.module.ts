import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repo';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, CloudinaryService],
})
export class OrderModule {}