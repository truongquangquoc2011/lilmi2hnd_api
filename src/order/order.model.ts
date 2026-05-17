import { z } from 'zod';

export enum OrderStatus {
  TRANSFER = 'TRANSFER',
  PACKED = 'PACKED',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  UNPAID = 'UNPAID',
  CASH = 'CASH',
}

export enum ShippingStatus {
  SHIPPING = 'SHIPPING',
  PICKUP = 'PICKUP',
  KEEP = 'KEEP',
}

export const CreateOrderInputSchema = z.object({
  customerName: z.string().min(1, 'Tên khách không được để trống'),
  orderContent: z.string().nullish().or(z.literal('')), 
  quantity: z.number().default(1).optional(),
  totalPrice: z.string().nullish().default('0'),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.UNPAID).optional(),
  shipping: z.nativeEnum(ShippingStatus).default(ShippingStatus.SHIPPING).optional(),
  address: z.string().nullish().or(z.literal('')),
  note: z.string().nullish().or(z.literal('')),
  trackingCode: z.string().nullish().or(z.literal('')),
  
  // THÊM: Mảng chứa các ID sản phẩm để liên kết
  productIds: z.array(z.string()).optional().default([]),
});

export const UpdateOrderInputSchema = CreateOrderInputSchema.partial();

export const OrderResponseSchema = CreateOrderInputSchema.extend({
  id: z.string(),
  stt: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Trả về thông tin sản phẩm đã gắn vào đơn
  products: z.array(z.any()).optional(),
});

export type CreateOrderInputType = z.infer<typeof CreateOrderInputSchema>;
export type UpdateOrderInputType = z.infer<typeof UpdateOrderInputSchema>;
export type OrderResponseType = z.infer<typeof OrderResponseSchema>;