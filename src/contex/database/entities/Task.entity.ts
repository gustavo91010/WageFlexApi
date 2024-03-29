import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Provider from './provider.entity';
import Employer from './employer.entity';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;

  @ManyToMany(() => Provider, (provider) => provider.tasks)
  providers: Provider[];

  @ManyToMany(() => Employer, (employer) => employer.tasks)
  employers: Employer[];

  constructor(type: string) {
    this.type = type;
  }
}
