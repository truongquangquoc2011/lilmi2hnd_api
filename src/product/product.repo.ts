import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryType } from '../shared/models/pagination.model';
import {
  CreateProductInputType,
  UpdateProductInputType,
  ListProductResType,
  ProductResponseType,
} from './product.model';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(query: PaginationQueryType): Promise<ListProductResType> {
    const skip = Number(query.skip) || 0;
    const take = Number(query.take) || 10;

    const [rows, total] = await Promise.all([
      this.prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: take,
      }),
      this.prisma.product.count(),
    ]);

    return {
      items: rows as ProductResponseType[],
      total,
      skip,
      take,
    };
  }

  async createProduct(
    data: CreateProductInputType,
  ): Promise<ProductResponseType> {
    const row = await this.prisma.product.create({
      data: {
        image: data.image!,
        isOutOfStock: data.isOutOfStock ?? false,
      },
    });

    return row as ProductResponseType;
  }

  async updateProduct(
    id: string,
    data: UpdateProductInputType,
  ): Promise<ProductResponseType> {
    try {
      const row = await this.prisma.product.update({
        where: { id },
        data,
      });

      return row as ProductResponseType;
    } catch {
      throw new NotFoundException('Không tìm thấy sản phẩm để cập nhật');
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.prisma.product.delete({ where: { id } });
      return { message: 'Xóa sản phẩm thành công' };
    } catch {
      throw new NotFoundException('Không tìm thấy sản phẩm để xóa');
    }
  }
}
