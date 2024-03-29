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
  @Column({ nullable: true })
  update_at: Date;

  @ManyToMany(() => Task, (task) => task.employers)
  @JoinTable()
  tasks: Task[];

  @OneToMany(() => Provider, (provider) => provider.employers)
  @JoinTable()
  provider: Provider;

  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Employer>) {
    Object.assign(this, init);
  }
}
