import { Module } from '@nestjs/common';
import DailyService from './service/daily.service';
import { ContextModule } from 'src/contex/context.module';

@Module({
  imports: [ContextModule],
  providers: [DailyService],
  exports: [DailyService],
})
export class DomainModule {}
