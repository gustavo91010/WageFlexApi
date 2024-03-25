import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}
