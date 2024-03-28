import { Controller, Get, Logger, Param } from '@nestjs/common';
import Task from 'src/contex/database/entities/Task.entity';
import TaskrService from 'src/domain/service/task.service';

@Controller('/task')
export default class TaskController {
  constructor(private readonly taskService: TaskrService) {}
  private readonly logger = new Logger(TaskController.name);

  @Get('/:type')
  public async findById(@Param('type') type: string): Promise<Task> {
    return await this.taskService.findByType(type);
  }
}
