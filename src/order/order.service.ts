// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CoffeeService } from 'src/coffee/coffee.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly coffeeRepository: CoffeeService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async create(order: Order): Promise<Order> {
    const coffee = await this.coffeeRepository.findOne(order.coffeeId);
    coffee.stock -= order.quantity;
    await this.coffeeRepository.update(order.coffeeId, coffee);

    return this.orderRepository.save(order);
  }

  async update(id: number, order: Order): Promise<Order> {
    const oldOrder = await this.orderRepository.findOneBy({ id });
    const coffee = await this.coffeeRepository.findOne(order.coffeeId);

    coffee.stock += oldOrder.quantity; // Revert the old order
    coffee.stock -= order.quantity; // Apply the new order
    await this.coffeeRepository.update(order.coffeeId, coffee);

    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
