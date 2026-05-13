import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrderInputType,
  OrderResponseType,
  UpdateOrderInputType,
} from './order.model';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(): Promise<OrderResponseType[]> {
    const rows = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows as OrderResponseType[];
  }

  async createOrder(data: CreateOrderInputType): Promise<OrderResponseType> {
    const count = await this.prisma.order.count();
    const row = await this.prisma.order.create({
      // Prisma sẽ tự hiểu Enum nếu bạn truyền đúng string viết hoa
      data: { ...data, stt: count + 1 },
    });
    return row as unknown as OrderResponseType; // Dùng unknown để tránh conflict nhẹ giữa Prisma Enum và Zod Enum
  }

  async updateOrder(
    id: string,
    data: UpdateOrderInputType,
  ): Promise<OrderResponseType> {
    try {
      const row = await this.prisma.order.update({
        where: { id },
        data,
      });
      return row as unknown as OrderResponseType;
    } catch {
      throw new NotFoundException('Không tìm thấy đơn hàng để cập nhật');
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.prisma.order.delete({ where: { id } });
      return { message: 'Xóa đơn hàng thành công' };
    } catch {
      throw new NotFoundException('Không tìm thấy đơn hàng để xóa');
    }
  }
}
