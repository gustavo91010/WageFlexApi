import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users';

@Entity()
export default class Activity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;

  @ManyToMany(() => Users, (users) => users.activities)
  users: Users[];

  constructor(type: string) {
    this.type = type;
  }
}
