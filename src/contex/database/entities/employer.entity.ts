import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Provider from './provider.entity';
import Task from './Task.entity';

@Entity()
export default class Employer {
  // o prestador do servico

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  create_at: Date;
  @Column()
  update_at: Date;
  @ManyToMany(() => Employer)
  @JoinTable()
  task: Task[];

  @OneToMany(() => Provider, (pro) => pro.employer)
  provider!: Provider[];

  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Employer>) {
    Object.assign(this, init);
  }
}
