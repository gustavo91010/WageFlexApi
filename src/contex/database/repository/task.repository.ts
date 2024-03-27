import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../entities/Task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  public async save(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }
  public async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async findOne(id: number): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }
  public async findType(type: string): Promise<Task> {
    return await this.taskRepository.findOneBy({ type });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
