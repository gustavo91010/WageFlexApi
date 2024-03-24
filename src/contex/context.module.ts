import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import EmployerEntity from 'src/contex/database/entities/employer.entity';
import ProviderEntity from 'src/contex/database/entities/provider.entity';
import { DailyRepository } from './database/repository/daily.repository';
import { ProviderRepository } from './database/repository/provider.repository';
import { EmployerRepository } from './database/repository/employer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Daily, ProviderEntity, EmployerEntity])],
  providers: [DailyRepository, ProviderRepository, EmployerRepository],
  exports: [DailyRepository, ProviderRepository, EmployerRepository],
})
export class ContextModule {}
