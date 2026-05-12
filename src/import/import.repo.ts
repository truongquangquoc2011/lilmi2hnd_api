import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryType } from '../shared/models/pagination.model';
import {
  CreateImportInputType,
  ImportResponseType,
  ListImportResType,
  UpdateImportInputType,
} from './import.model';

@Injectable()
export class ImportsRepository {
  private readonly logger = new Logger(ImportsRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getImports(query: PaginationQueryType): Promise<ListImportResType> {
    // Ép kiểu skip và take sang Number 
    const skip = Number(query.skip) || 0;
    const take = Number(query.take) || 10;

    const [rows, total] = await Promise.all([
      this.prisma.import.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip, 
        take: take, 
      }),
      this.prisma.import.count(),
    ]);

    return { items: rows as ImportResponseType[], total, skip, take };
  }

  async createImport(data: CreateImportInputType): Promise<ImportResponseType> {
    const row = await this.prisma.import.create({ data });
    return row as ImportResponseType;
  }

  async updateImport(
    id: string,
    data: UpdateImportInputType,
  ): Promise<ImportResponseType> {
    try {
      const row = await this.prisma.import.update({
        where: { id },
        data,
      });
      return row as ImportResponseType;
    } catch (error) {
      throw new NotFoundException('Không tìm thấy kiện hàng để cập nhật');
    }
  }

  async deleteImport(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.import.delete({ where: { id } });
      return { message: 'Xóa kiện hàng thành công' };
    } catch (error) {
      throw new NotFoundException('Không tìm thấy kiện hàng để xóa');
    }
  }
}
