import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Activity from './activity';
import { UUID } from 'crypto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  identification: string;

  @Column()
  create_at: Date;

  @Column({ nullable: true })
  update_at: Date;
  @Column()
  active: boolean;

  @Column()
  role: string;

  @ManyToMany(() => Activity, (activities) => activities.users)
  @JoinTable()
  activities: Activity[];

  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Users>) {
    Object.assign(this, init);
  }
}
