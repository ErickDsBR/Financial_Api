import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//! arquivo que controla database

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @Column({ type: 'varchar', length: 100 })
  name!: string;
  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;
  @Column({ type: 'varchar', length: 255 })
  password!: string;
}
