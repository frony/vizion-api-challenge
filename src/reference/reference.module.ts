import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { Reference } from './reference.model';

@Module({
  imports: [SequelizeModule.forFeature([Reference])],
  providers: [ReferenceService],
  controllers: [ReferenceController],
})
export class ReferenceModule {}
