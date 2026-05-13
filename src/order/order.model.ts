import { z } from 'zod';

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
  // Chỉ trường này có .min(1)
  customerName: z.string().min(1, 'Tên khách không được để trống'),

  // Các trường còn lại dùng .nullish() để chấp nhận cả null, undefined hoặc chuỗi rỗng
  orderContent: z.string().nullish().or(z.literal('')), 
  quantity: z.number().default(1).optional(),
  totalPrice: z.string().nullish().default('0'),
  
  status: z.nativeEnum(OrderStatus).default(OrderStatus.UNPAID).optional(),
  shipping: z.nativeEnum(ShippingStatus).default(ShippingStatus.SHIPPING).optional(),
  
  address: z.string().nullish().or(z.literal('')),
  note: z.string().nullish().or(z.literal('')),
  trackingCode: z.string().nullish().or(z.literal('')),
});

export const UpdateOrderInputSchema = CreateOrderInputSchema.partial();

export const OrderResponseSchema = CreateOrderInputSchema.extend({
  id: z.string(),
  stt: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateOrderInputType = z.infer<typeof CreateOrderInputSchema>;
export type UpdateOrderInputType = z.infer<typeof UpdateOrderInputSchema>;
export type OrderResponseType = z.infer<typeof OrderResponseSchema>;