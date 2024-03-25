import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employer from 'src/contex/database/entities/employer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerRepository {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
  ) {}

  findAll(): Promise<Employer[]> {
    return this.employerRepository.find();
  }

  findOne(id: number): Promise<Employer | null> {
    return this.employerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.employerRepository.delete(id);
  }
}
