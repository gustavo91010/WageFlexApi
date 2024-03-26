import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import Employer from 'src/contex/database/entities/employer.entity';
import Provider from 'src/contex/database/entities/provider.entity';
import Task from './entities/Task.entity';
import 'dotenv/config';

export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: parseInt(process.env.PG_PORT),
  host: process.env.WF_URL,
  database: process.env.WF_DATABASE,
  username: process.env.WF_USER,
  password: process.env.WF_PASSWORD,
  synchronize: true,
  entities: [Daily, Provider, Employer, Task],
  migrations: [`${__dirname}/migrations/{.ts,*.js}`],
  migrationsRun: true,
};
