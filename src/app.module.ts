import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Reference } from './reference/reference.model';
import { ReferenceModule } from './reference/reference.module';
import { Result } from './result/result.model';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'P0stgr35V1z10n',
      database: 'postgres-vizion',
      models: [Reference, Result],
    }),
    ReferenceModule,
    ResultModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
