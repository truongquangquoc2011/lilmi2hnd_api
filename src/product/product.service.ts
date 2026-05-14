import { Injectable } from '@nestjs/common';
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
    let imageUrl = payload.image;
    if (file) {
      imageUrl = await this.cloudinary.uploadImage(file);
    }
    return this.repo.createProduct({ ...payload, image: imageUrl });
  }

  async update(id: string, payload: UpdateProductInputType, file?: Express.Multer.File) {
    let imageUrl = payload.image;
    if (file) {
      imageUrl = await this.cloudinary.uploadImage(file);
    }
    return this.repo.updateProduct(id, { ...payload, image: imageUrl });
  }

  remove(id: string) {
    return this.repo.deleteProduct(id);
  }
}