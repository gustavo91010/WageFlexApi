import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Activity from './activity';
import { Users } from './users';

@Entity()
export default class Daily {
  constructor(init?: Partial<Daily>) {
    Object.assign(this, init);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Activity)
  @JoinTable()
  task: Activity[];

  @Column({ nullable: true })
  unitPrice: number;

  @Column({ nullable: true })
  serviceCost: number;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  update_at: Date;

  @Column({ nullable: true })
  endTime: Date;

  @ManyToOne(() => Users, { eager: true }) // Relacionamento many-to-one com um usuário
  @JoinColumn()
  employer: Users;

  @ManyToOne(() => Users, { eager: true }) // Segundo relacionamento many-to-one com outro usuário
  @JoinColumn()
  provider: Users;
}
