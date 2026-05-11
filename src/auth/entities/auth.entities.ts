import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @Column()
  email!: string;
  @Column()
  username!: string;
  @Column()
  password!: string;
}
