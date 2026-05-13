import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repo';
import { CreateOrderInputType, UpdateOrderInputType } from './order.model';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  findAll() {
    return this.repo.getOrders();
  }

  create(payload: CreateOrderInputType) {
    return this.repo.createOrder(payload);
  }

  update(id: string, payload: UpdateOrderInputType) {
    return this.repo.updateOrder(id, payload);
  }

  remove(id: string) {
    return this.repo.deleteOrder(id);
  }
}