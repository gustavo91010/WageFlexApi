import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import DailyController from './controller/daily.controller';
import EmployerController from './controller/employer.controller';
import ProviderController from './controller/provider.controller';

@Module({
  imports: [DomainModule],
  providers: [],
  controllers: [DailyController, EmployerController, ProviderController],
})
export class ApiModule {}
