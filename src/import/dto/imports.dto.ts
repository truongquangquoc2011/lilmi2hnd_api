// src/modules/imports/dto/imports.dto.ts
import { createZodDto } from 'nestjs-zod';
import {
  CreateImportInputSchema,
  UpdateImportInputSchema,
  ListImportQuerySchema,
  ListImportResSchema,
  ImportResponseSchema,
} from '../imports.model';

/**
 * DTO dùng cho việc tạo mới một kiện hàng.
 * Ánh xạ từ CreateImportInputSchema.
 */
export class CreateImportDTO extends createZodDto(CreateImportInputSchema) {}

/**
 * DTO dùng cho việc cập nhật thông tin hoặc trạng thái kiện hàng.
 * Cho phép cập nhật từng phần (Partial).
 */
export class UpdateImportDTO extends createZodDto(UpdateImportInputSchema) {}

/**
 * DTO dùng cho các tham số truy vấn danh sách (phân trang).
 * Kế thừa từ PaginationQuerySchema của hệ thống.
 */
export class ListImportQueryDTO extends createZodDto(ListImportQuerySchema) {}

/**
 * DTO định nghĩa cấu trúc phản hồi của một danh sách kiện hàng.
 * Bao gồm mảng các items và metadata phân trang.
 */
export class ListImportResDTO extends createZodDto(ListImportResSchema) {}

/**
 * DTO định nghĩa cấu trúc phản hồi của một kiện hàng đơn lẻ.
 */
export class ImportResponseDTO extends createZodDto(ImportResponseSchema) {}
