import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import DailyController from './controller/daily.controller';
import UsersController from './controller/users.controller';
import ActivityController from './controller/activity.controller';

@Module({
  imports: [DomainModule],
  providers: [],
  controllers: [DailyController, UsersController, ActivityController],
})
export class ApiModule {}
