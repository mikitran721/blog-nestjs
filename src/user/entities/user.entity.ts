import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column({nullable:true, default:null})
  refresh_token: string;

  @Column({ default: 1 })
  status: number;
  
  @CreateDateColumn()
  created_at: Date;
  
  @CreateDateColumn()
  updated_at: Date;
}