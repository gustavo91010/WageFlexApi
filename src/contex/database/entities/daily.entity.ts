import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Employer from './employer.entity';
import Provider from './provider.entity';
import Task from './Task.entity';

@Entity()
export default class Daily {
  constructor(init?: Partial<Daily>) {
    Object.assign(this, init);
  }
  @PrimaryGeneratedColumn()
  id: number;

  //@Column({ nullable: false })
  //typeService: string;
  @ManyToMany(() => Daily)
  @JoinTable()
  task: Task[];

  @Column({ nullable: false })
  unitPrice: number;

  @Column()
  serviceCost: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Provider, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  provider: Provider;

  @ManyToOne(() => Employer, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  employer: Employer;
}
