import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily';
import Activity from './entities/activity';
import 'dotenv/config';
import { Users } from './entities/users';

export const TypeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: parseInt(process.env.PG_PORT),
  host: process.env.WF_URL,
  database: process.env.WF_DATABASE,
  username: process.env.WF_USER,
  password: process.env.WF_PASSWORD,
  synchronize: true,
  entities: [Daily, Users, Activity],
  migrations: [`${__dirname}/migrations/{.ts,*.js}`],
  migrationsRun: true,
};
