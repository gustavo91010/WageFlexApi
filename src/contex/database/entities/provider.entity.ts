import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import EmployerEntity from './employer.entity';

@Entity()
export default class ProviderEntity {
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

  @OneToMany(() => EmployerEntity, (emp) => emp.provider)
  employer: EmployerEntity[];
  @Column()
  accessToken: UUID;

  constructor(init?: Partial<ProviderEntity>) {
    Object.assign(this, init);
  }
}
