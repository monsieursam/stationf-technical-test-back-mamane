// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async update(id: number, order: Order): Promise<Order> {
    await this.orderRepository.update(id, order);
    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
