import { Injectable } from '@nestjs/common';
import Employer from 'src/contex/database/entities/employer.entity';
import { EmployerRepository } from 'src/contex/database/repository/employer.repository';
import { NotFoundException } from '../errors/not-found-exception';

@Injectable()
export default class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  public async findById(id: number): Promise<Employer> | null {
    const employer = await this.employerRepository.findOne(id);
    if (!employer) {
      throw new NotFoundException('Employer não encontrado');
    }
    return employer;
  }
}
