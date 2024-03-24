import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProviderEntity from './provider.entity';

@Entity()
export default class EmployerEntity {
  // o empregado, a pessoa que presta o servico

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  legalName: string;
  @Column()
  cnpj: string;
  @Column()
  offeredServicetype: string;

  @OneToMany(() => ProviderEntity, (pro) => pro.employer)
  provider!: ProviderEntity[];

  @Column()
  accessToken: UUID;

  constructor(init?: Partial<EmployerEntity>) {
    Object.assign(this, init);
  }
}
