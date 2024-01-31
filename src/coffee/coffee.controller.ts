// coffee.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import JwtAuthGuard
import { Roles } from '../auth/roles.decorator'; // Import Roles decorator
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(): Promise<Coffee[]> {
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Coffee> {
    return this.coffeeService.findOne(+id);
  }

  @Roles('Admin') // Use the Roles decorator to restrict access to Admin
  @UseGuards(JwtAuthGuard, RolesGuard) // Use JwtAuthGuard and RolesGuard
  @Post()
  create(@Body() coffee: Coffee): Promise<Coffee> {
    return this.coffeeService.create(coffee);
  }

  @Roles('Admin') // Use the Roles decorator to restrict access to Admin
  @UseGuards(JwtAuthGuard, RolesGuard) // Use JwtAuthGuard and RolesGuard
  @Put(':id')
  update(@Param('id') id: string, @Body() coffee: Coffee): Promise<Coffee> {
    return this.coffeeService.update(+id, coffee);
  }

  @Roles('Admin') // Use the Roles decorator to restrict access to Admin
  @UseGuards(JwtAuthGuard, RolesGuard) // Use JwtAuthGuard and RolesGuard
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coffeeService.remove(+id);
  }
}
