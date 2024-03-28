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

  public async save(employer: Employer) {
    return await this.employerRepository.save(employer);
  }
  async findAll(): Promise<Employer[]> {
    return await this.employerRepository.find();
  }

  async findOne(id: number): Promise<Employer | null> {
    return await this.employerRepository.findOneBy({ id });
  }
  async findEmail(email: string): Promise<Employer | null> {
    return await this.employerRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.employerRepository.delete(id);
  }
  public async update(employer: Employer) {
    return await this.employerRepository.save(employer);
  }}
