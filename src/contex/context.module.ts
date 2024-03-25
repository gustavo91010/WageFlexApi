import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import Employer from 'src/contex/database/entities/employer.entity';
import Provider from 'src/contex/database/entities/provider.entity';
import { DailyRepository } from './database/repository/daily.repository';
import { ProviderRepository } from './database/repository/provider.repository';
import { EmployerRepository } from './database/repository/employer.repository';
import { TaskRepository } from './database/repository/task.repository';
import Task from './database/entities/Task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Daily, Provider, Employer, Task])],
  providers: [
    DailyRepository,
    ProviderRepository,
    EmployerRepository,
    TaskRepository,
  ],
  exports: [
    DailyRepository,
    ProviderRepository,
    EmployerRepository,
    TaskRepository,
  ],
})
export class ContextModule {}
