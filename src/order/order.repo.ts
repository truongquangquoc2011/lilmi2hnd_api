import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrderInputType,
  OrderResponseType,
  UpdateOrderInputType,
} from './order.model';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Lấy danh sách - Chỉ lấy các field cần để hiện trên Sheet
  async getOrders(): Promise<OrderResponseType[]> {
    const rows = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            // Đã lược bỏ description và orderIds để tối ưu dung lượng
          }
        },
      },
    });
    return rows as unknown as OrderResponseType[];
  }

  // 2. Tạo đơn hàng - Có check ID sản phẩm bậy bạ
  async createOrder(data: CreateOrderInputType): Promise<OrderResponseType> {
    const { productIds, ...orderData } = data;

    if (productIds && productIds.length > 0) {
      const validProducts = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true },
      });
      if (validProducts.length !== productIds.length) {
        throw new BadRequestException('Một hoặc nhiều ID sản phẩm không tồn tại!');
      }
    }

    const count = await this.prisma.order.count();
    const row = await this.prisma.order.create({
      data: { 
        ...orderData, 
        stt: count + 1,
        products: { connect: productIds?.map(id => ({ id })) }
      },
      include: { products: true },
    });
    return row as unknown as OrderResponseType;
  }

  // 3. Cập nhật đơn hàng
  async updateOrder(id: string, data: UpdateOrderInputType): Promise<OrderResponseType> {
    const { productIds, ...orderData } = data;

    if (productIds && productIds.length > 0) {
      const validProducts = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true },
      });
      if (validProducts.length !== productIds.length) {
        throw new BadRequestException('ID sản phẩm gửi lên không hợp lệ!');
      }
    }

    try {
      const row = await this.prisma.order.update({
        where: { id },
        data: {
          ...orderData,
          ...(productIds && {
            products: { set: productIds.map(id => ({ id })) }
          })
        },
        include: { products: true },
      });
      return row as unknown as OrderResponseType;
    } catch {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.prisma.order.delete({ where: { id } });
      return { message: 'Xóa đơn hàng thành công' };
    } catch {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
  }
}