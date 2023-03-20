import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResultService} from "./result.service";
import { ResultController } from './result.controller';
import { Result } from './result.model';

@Module({
  imports: [SequelizeModule.forFeature([Result])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
