import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  website: string;

}
