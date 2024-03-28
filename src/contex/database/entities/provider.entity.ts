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
  legalName: string;
  @Column()
  cnpj: string;
  @Column()
  create_at: Date;
  @Column({ nullable: true })
  update_at?: Date;
 
  @ManyToMany(() => Provider,{
    nullable: true,
    cascade: true,
    //eager: true,
  })
  @JoinTable()
  task?: Task[];

  @OneToMany(() => Employer, (emp) => emp.provider)
  employer?: Employer[];
  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Provider>) {
    Object.assign(this, init);
  }
}
