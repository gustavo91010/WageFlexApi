import { Module } from '@nestjs/common';
import DailyService from './service/daily.service';
import { ContextModule } from 'src/contex/context.module';
import UsersService from './service/users.service';
import ActivityService from './service/activity.service';

@Module({
  imports: [ContextModule],
  providers: [DailyService, UsersService, ActivityService],
  exports: [DailyService, UsersService, ActivityService],
})
export class DomainModule {}
