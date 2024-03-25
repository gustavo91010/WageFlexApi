import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import Employer from 'src/contex/database/entities/employer.entity';
import Provider from 'src/contex/database/entities/provider.entity';
import Task from './entities/Task.entity';

export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  //database: 'wage_flex_db', //process.env.WF_DATABASE,
  synchronize: true,
  entities: [Daily, Provider, Employer, Task],
  // migrations: [`${__dirname}/migrations/{.ts,*.js}`],
  // migrationsRun: true,
};
