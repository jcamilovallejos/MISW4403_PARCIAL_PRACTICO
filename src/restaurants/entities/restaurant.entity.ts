import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Dish } from '../../dishes/entities/dish.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({
    type: 'enum',
    enum: ['Italiana', 'Japonesa', 'Mexicana', 'Colombiana', 'India', 'Internacional'],
  })
  cuisineType!: string;

  @Column()
  website!: string;

  @ManyToMany(() => Dish, dish => dish.restaurants, { cascade: true })
  @JoinTable()
  dishes!: Dish[];
}
