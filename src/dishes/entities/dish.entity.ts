import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal', { 
    precision: 10, 
    scale: 2 
  })
  price!: number;

  @Column({
    type: 'enum',
    enum: ['entrada', 'plato fuerte', 'postre', 'bebida']
  })
  category!: string;

  @ManyToMany(() => Restaurant, restaurant => restaurant.dishes)
  restaurants!: Restaurant[];
}
