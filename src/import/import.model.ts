import { z } from 'zod';
import { PaginationQuerySchema, PaginationResBaseSchema } from '../shared/models/pagination.model';

export enum IMPORT_STATUS {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
}

// ==================== INPUT SCHEMAS ====================
export const CreateImportInputSchema = z.object({
  // Chỉ có provider là bắt buộc
  provider: z.string().min(1, 'Nơi nhập không được để trống'), 
  
  // Các trường còn lại cho optional hết
  baleName: z.string().optional(),
  price: z.string().optional(),
  phone: z.string().optional(),
  note: z.string().optional(),
  
  // isPaid bắt buộc là boolean, mặc định là false
  isPaid: z.boolean().default(false),
}); // BỎ .strict() ở đây để tránh lỗi "should not exist" khi có meta-data của NestJS

export const UpdateImportInputSchema = CreateImportInputSchema.partial().extend({
  status: z.nativeEnum(IMPORT_STATUS).optional(),
});

// ==================== RESPONSE SCHEMAS ====================
export const ImportResponseSchema = z.object({
  id: z.string(),
  provider: z.string(),
  baleName: z.string().nullable().optional(),
  price: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  isPaid: z.boolean(),
  status: z.nativeEnum(IMPORT_STATUS),
  createdAt: z.coerce.date(),
});

export const ListImportResSchema = PaginationResBaseSchema.extend({
  items: z.array(ImportResponseSchema),
});

// ==================== TYPES ====================
export type CreateImportInputType = z.infer<typeof CreateImportInputSchema>;
export type UpdateImportInputType = z.infer<typeof UpdateImportInputSchema>;
export type ImportResponseType = z.infer<typeof ImportResponseSchema>;
export type ListImportResType = z.infer<typeof ListImportResSchema>;

// Quan trọng: Đảm bảo Query Schema cho phép các trường phân trang
export const ListImportQuerySchema = PaginationQuerySchema;