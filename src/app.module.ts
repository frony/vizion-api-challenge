import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReferenceModule } from './modules/reference/reference.module';
import { ResultModule } from './modules/result/result.module';

@Module({
  imports: [
    ReferenceModule,
    ResultModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
