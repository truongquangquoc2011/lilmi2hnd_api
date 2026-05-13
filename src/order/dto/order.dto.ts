import { createZodDto } from 'nestjs-zod';
import {
  CreateOrderInputSchema,
  UpdateOrderInputSchema,
  OrderResponseSchema,
} from '../order.model';

export class CreateOrderDTO extends createZodDto(CreateOrderInputSchema) {}
export class UpdateOrderDTO extends createZodDto(UpdateOrderInputSchema) {}
export class OrderResponseDTO extends createZodDto(OrderResponseSchema) {}