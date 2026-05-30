import { z } from 'zod';
import { PaginationQuerySchema, PaginationResBaseSchema } from '../shared/models/pagination.model';

export const CreateProductInputSchema = z.object({
  image: z.string().optional().nullable(),
  isOutOfStock: z.preprocess(
    (val) => val === true || val === 'true',
    z.boolean()
  ).default(false).optional(),
});

export const UpdateProductInputSchema = CreateProductInputSchema.partial();

export const ProductResponseSchema = z.object({
  id: z.string(),
  image: z.string(),
  isOutOfStock: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ListProductQuerySchema = PaginationQuerySchema;

export const ListProductResSchema = PaginationResBaseSchema.extend({
  items: z.array(ProductResponseSchema),
});

export type CreateProductInputType = z.infer<typeof CreateProductInputSchema>;
export type UpdateProductInputType = z.infer<typeof UpdateProductInputSchema>;
export type ProductResponseType = z.infer<typeof ProductResponseSchema>;
export type ListProductResType = z.infer<typeof ListProductResSchema>;