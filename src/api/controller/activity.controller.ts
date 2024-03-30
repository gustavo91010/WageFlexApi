import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import Activity from 'src/contex/database/entities/activity';
import ActivityService from 'src/domain/service/activity.service';

@Controller('/activity')
export default class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  private readonly logger = new Logger(ActivityController.name);

  @Post('/:type')
  public async register(
   @Param('type') type: string,
  ): Promise<{ message: string; provider: Activity }> {
    try {
      const response = await this.activityService.register(type);
      this.logger.log('Create activity: ' + response.id);

      return {
        message: `Create activity: ${response.id}`,
        provider: response,
      };
    } catch (error) {
      return {
        message: error.message,
        provider: null,
      };
    }
  }

  @Get('/:type')
  public async findById(@Param('type') type: string): Promise<Activity> {
    return await this.activityService.findByType(type);
  }
}
