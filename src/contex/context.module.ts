import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily';
import { DailyRepository } from './database/repository/daily.repository';
import { UsersRepository } from './database/repository/users.repository';
import { ActivityRepository } from './database/repository/activity.repository';
import Activity from './database/entities/activity';
import { Users } from './database/entities/users';

@Module({
  imports: [TypeOrmModule.forFeature([Daily, Users, Activity])],
  providers: [DailyRepository, UsersRepository, ActivityRepository],
  exports: [DailyRepository, UsersRepository, ActivityRepository],
})
export class ContextModule {}
