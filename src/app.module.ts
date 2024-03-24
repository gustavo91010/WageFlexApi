import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './contex/database/typeorm.contig';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(TypeormConfig),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
