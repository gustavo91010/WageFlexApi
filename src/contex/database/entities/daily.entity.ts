import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EmployerEntity from './employer.entity';
import ProviderEntity from './provider.entity';

@Entity()
export default class Daily {
  constructor(init?: Partial<Daily>) {
    Object.assign(this, init);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  typeService: string;
  @Column({ nullable: false })
  unitPrice: number;
  @Column()
  serviceCost: number;
  @Column()
  startTime: Date;
  @Column()
  endTime: Date;

  @OneToOne(() => ProviderEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  provider: ProviderEntity;

  @OneToOne(() => EmployerEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  employer: EmployerEntity;
}
