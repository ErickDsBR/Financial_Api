import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @Column({ length: 100 })
  name!: string;
  @Column({ unique: true, length: 100 })
  email!: string;
  @Column({ length: 100 })
  password!: string;
}
