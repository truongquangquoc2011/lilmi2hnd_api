import { z } from 'zod';
import { PaginationQuerySchema, PaginationResBaseSchema } from '../shared/models/pagination.model';

export const CreateProductInputSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  price: z.preprocess((val) => Number(val), z.number().min(0)).default(0).optional(),
  description: z.string().nullish().or(z.literal('')),
  image: z.string().nullish().or(z.literal('')),
});

export const UpdateProductInputSchema = CreateProductInputSchema.partial();

export const ProductResponseSchema = CreateProductInputSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema phục vụ phân trang
export const ListProductQuerySchema = PaginationQuerySchema;

export const ListProductResSchema = PaginationResBaseSchema.extend({
  items: z.array(ProductResponseSchema),
});

export type CreateProductInputType = z.infer<typeof CreateProductInputSchema>;
export type UpdateProductInputType = z.infer<typeof UpdateProductInputSchema>;
export type ProductResponseType = z.infer<typeof ProductResponseSchema>;
export type ListProductResType = z.infer<typeof ListProductResSchema>;