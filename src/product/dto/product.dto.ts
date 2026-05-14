import { createZodDto } from 'nestjs-zod';
import {
  CreateProductInputSchema,
  UpdateProductInputSchema,
  ListProductQuerySchema,
  ListProductResSchema,
  ProductResponseSchema,
} from '../product.model';

export class CreateProductDTO extends createZodDto(CreateProductInputSchema) {}
export class UpdateProductDTO extends createZodDto(UpdateProductInputSchema) {}
export class ListProductQueryDTO extends createZodDto(ListProductQuerySchema) {}
export class ListProductResDTO extends createZodDto(ListProductResSchema) {}
export class ProductResponseDTO extends createZodDto(ProductResponseSchema) {}