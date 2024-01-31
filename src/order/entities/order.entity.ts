// order.entity.ts
import { Coffee } from 'src/coffee/entities/coffee.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coffeeId: number;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @ManyToOne(() => Coffee, (coffee) => coffee.orders)
  @JoinColumn({ name: 'coffeeId' })
  coffee: Coffee;
}
