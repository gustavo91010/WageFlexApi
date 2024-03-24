import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import EmployerEntity from 'src/contex/database/entities/employer.entity';
import ProviderEntity from 'src/contex/database/entities/provider.entity';

export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  //database: 'wage_flex_db', //process.env.WF_DATABASE,
  synchronize: true,
  entities: [Daily, ProviderEntity, EmployerEntity],
  // migrations: [`${__dirname}/migrations/{.ts,*.js}`],
  // migrationsRun: true,
};
