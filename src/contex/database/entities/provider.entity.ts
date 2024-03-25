import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Employer from './employer.entity';
import Task from './Task.entity';

@Entity()
export default class Provider {
  //  a empresa,que fornesse o servcio

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  registrationDate: Date;
  @Column()
  updateAt: Date;
 
  @ManyToMany(() => Provider)
  @JoinTable()
  task: Task[];

  @OneToMany(() => Employer, (emp) => emp.provider)
  employer: Employer[];
  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Provider>) {
    Object.assign(this, init);
  }
}
