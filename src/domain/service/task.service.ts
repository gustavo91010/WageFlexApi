import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import { TaskRepository } from 'src/contex/database/repository/task.repository';
import Task from 'src/contex/database/entities/Task.entity';

@Injectable()
export default class TaskrService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async register(type: string): Promise<Task> {
    let nastType = await this.findByType(type.toLowerCase());

    if (!nastType) {
      nastType = await this.create(type);
    }
    return nastType;
  }

  private async create(type: string): Promise<Task> {
    const task = new Task(type);
    return await this.taskRepository.save(task);
  }
  public async findById(id: number): Promise<Task> | null {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Employer não encontrado');
    }
    return task;
  }
  public async findByType(type: string): Promise<Task> | null {
    const task = await this.taskRepository.findType(type);
    return task;
  }
}
