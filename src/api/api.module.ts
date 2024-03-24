import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import DailyController from './controller/daily.controller';

@Module({
  imports: [DomainModule],
  providers: [],
  controllers: [DailyController],
})
export class ApiModule {}
