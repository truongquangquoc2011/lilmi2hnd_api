import { z } from 'zod';

// 1. Định nghĩa Enum ở đây để dùng cho toàn bộ hệ thống
export enum OrderStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  TRANSFER = 'TRANSFER',
  CASH = 'CASH',
}

export enum ShippingStatus {
  PICKUP = 'PICKUP',
  DELIVERED = 'DELIVERED',
  SHIPPING = 'SHIPPING',
  KEEP = 'KEEP',
}

export const CreateOrderInputSchema = z.object({
  customerName: z.string().min(1, 'Tên khách không được để trống'),
  orderContent: z.string().min(1, 'Nội dung đơn không được để trống'),
  quantity: z.number().default(1),
  totalPrice: z.string().optional(),
  
  // 2. Sử dụng nativeEnum để validate dữ liệu từ FE gửi lên
  status: z.nativeEnum(OrderStatus).default(OrderStatus.UNPAID),
  shipping: z.nativeEnum(ShippingStatus).default(ShippingStatus.SHIPPING),
  
  address: z.string().optional(),
  note: z.string().optional(),
  trackingCode: z.string().optional(),
});

export const UpdateOrderInputSchema = CreateOrderInputSchema.partial();

export const OrderResponseSchema = CreateOrderInputSchema.extend({
  id: z.string(),
  stt: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CreateOrderInputType = z.infer<typeof CreateOrderInputSchema>;
export type UpdateOrderInputType = z.infer<typeof UpdateOrderInputSchema>;
export type OrderResponseType = z.infer<typeof OrderResponseSchema>;