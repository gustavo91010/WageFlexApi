import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Provider from './provider.entity';

@Entity()
export default class Employer {
  // o empregado, a pessoa que presta o servico

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  legalName: string;
  @Column()
  cnpj: string;
  @Column()
  task: string;

  @OneToMany(() => Provider, (pro) => pro.employer)
  provider!: Provider[];

  @Column()
  accessToken: UUID;

  constructor(init?: Partial<Employer>) {
    Object.assign(this, init);
  }
}
