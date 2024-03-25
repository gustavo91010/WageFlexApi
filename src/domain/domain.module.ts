import { Module } from '@nestjs/common';
import DailyService from './service/daily.service';
import { ContextModule } from 'src/contex/context.module';
import EmployerService from './service/employer.service';
import ProviderService from './service/provider.service';
import TaskrService from './service/task.service';

@Module({
  imports: [ContextModule],
  providers: [DailyService, EmployerService, ProviderService, TaskrService],
  exports: [DailyService, EmployerService, ProviderService, TaskrService],
})
export class DomainModule {}
