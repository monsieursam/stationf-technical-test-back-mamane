// coffee.entity.ts
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  stock: number;

  @OneToMany(() => Order, (order) => order.coffee)
  orders: Order[];
}
