import { BadRequestException, Injectable, Provider } from '@nestjs/common';
import Employer from 'src/contex/database/entities/employer.entity';
import { EmployerRepository } from 'src/contex/database/repository/employer.repository';
import { NotFoundException } from '../errors/not-found-exception';
import EmployerDTO from '../models/employer.dto';
import TaskrService from './task.service';

@Injectable()
export default class EmployerService {
  constructor(
    private readonly employerRepository: EmployerRepository,
    private readonly taskService: TaskrService,
  ) {}

  public async findById(id: number): Promise<Employer> | null {
    const employer = await this.employerRepository.findOne(id);
    if (!employer) {
      throw new NotFoundException('Employer não encontrado');
    }
    return employer;
  }
  public async create(employerDto: EmployerDTO): Promise<Employer> {
    const { nome, email, task } = employerDto;
    const employer = new Employer();
    employer.name = nome;
    employer.email = email;
    employer.task = [];

    console.log(task.length);
    if (!Array.isArray(task)) {// para garantir que seja um array
      throw new BadRequestException();
    }
    for (const singleTask of task) {
      console.log('singleTask', singleTask);
      const hum = await this.taskService.create(singleTask);
      console.log(hum);
      employer.task.push(hum);
    }
    return employer;
  }
}
