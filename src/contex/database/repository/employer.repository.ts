import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EmployerEntity from 'src/contex/database/entities/employer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerRepository {
  constructor(
    @InjectRepository(EmployerEntity)
    private employerRepository: Repository<EmployerEntity>,
  ) {}

  findAll(): Promise<EmployerEntity[]> {
    return this.employerRepository.find();
  }

  findOne(id: number): Promise<EmployerEntity | null> {
    return this.employerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.employerRepository.delete(id);
  }
}
