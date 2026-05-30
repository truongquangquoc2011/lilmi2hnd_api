import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repo';
import { CloudinaryService } from '../shared/services/cloudinary.service';
import { PaginationQueryType } from '../shared/models/pagination.model';
import { CreateProductInputType, UpdateProductInputType } from './product.model';
import 'multer';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async findAll(query: PaginationQueryType) {
    return this.repo.getProducts(query);
  }

  async create(payload: CreateProductInputType, file?: Express.Multer.File) {
    let imageUrl = payload.image ?? '';

    if (file) {
      imageUrl = await this.cloudinary.uploadImage(file);
    }

    if (!imageUrl) {
      throw new BadRequestException('Vui lòng thêm ảnh sản phẩm');
    }

    return this.repo.createProduct({
      image: imageUrl,
      isOutOfStock: payload.isOutOfStock ?? false,
    });
  }

  async update(id: string, payload: UpdateProductInputType, file?: Express.Multer.File) {
    let imageUrl = payload.image;

    if (file) {
      imageUrl = await this.cloudinary.uploadImage(file);
    }

    return this.repo.updateProduct(id, {
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(payload.isOutOfStock !== undefined
        ? { isOutOfStock: payload.isOutOfStock }
        : {}),
    });
  }

  async updateStockStatus(id: string, isOutOfStock: boolean) {
    return this.repo.updateProduct(id, { isOutOfStock });
  }

  remove(id: string) {
    return this.repo.deleteProduct(id);
  }
}