// coffee.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    return this.coffeeRepository.findOneBy({ id });
  }

  async create(coffee: Coffee): Promise<Coffee> {
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, coffee: Coffee): Promise<Coffee> {
    await this.coffeeRepository.update(id, coffee);
    return this.coffeeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.coffeeRepository.delete(id);
  }
}
