import { BadRequestException, Injectable } from '@nestjs/common';
import Employer from 'src/contex/database/entities/employer.entity';
import { EmployerRepository } from 'src/contex/database/repository/employer.repository';
import { NotFoundException } from '../errors/not-found-exception';
import EmployerDTO from '../models/employer.dto';
import TaskrService from './task.service';
import { randomUUID } from 'crypto';
import { MsgException } from '../errors/msg.exception';

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
  public async findByEmail(email: string): Promise<Employer> | null {
    const employer = await this.employerRepository.findEmail(email);

    return employer;
  }
  public async create(employerDto: EmployerDTO): Promise<Employer> {
    const { nome, email, task } = employerDto;
    let employer = new Employer();
    employer.name = nome;
    employer.email = email;
    employer.task = [];
    if (await this.findByEmail(email)) {
      throw new MsgException('usuário já registrado');
    }

    if (!Array.isArray(task) || task.length === 0) {
      throw new BadRequestException();
    }

    employer.create_at = new Date();
    employer.accessToken = randomUUID();

    for (const singleTask of task) {
      let newTask;
      const existingTask = await this.taskService.findByType(singleTask);
console.log('existingTask',existingTask)
      if (existingTask) {
        newTask = existingTask;
      } else {
        newTask = await this.taskService.register(singleTask);
      }
      employer.task.push(newTask);
    }
    employer = await this.employerRepository.save(employer);
    return employer;
  }

  public async update(id: number, employerDto: Employer): Promise<Employer> {
    let emplyer = await this.findById(id);

    Object.assign(emplyer, employerDto),
      (emplyer = await this.employerRepository.update(emplyer));

    return emplyer;
  }
}
