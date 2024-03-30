import { Controller, Get, Logger, Param } from '@nestjs/common';
import Activity from 'src/contex/database/entities/activity';
import ActivityService from 'src/domain/service/activity.service';

@Controller('/task')
export default class ActivityController {
  constructor(private readonly taskService: ActivityService) {}
  private readonly logger = new Logger(ActivityController.name);

  @Get('/:type')
  public async findById(@Param('type') type: string): Promise<Activity> {
    return await this.taskService.findByType(type);
  }
}
