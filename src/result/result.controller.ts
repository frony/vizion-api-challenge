import { Controller, Get, Param } from '@nestjs/common';
import { ResultService } from './result.service';
@Controller()
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
  @Get(':id')
  async create(@Param('id') refId: string) {
    return this.resultService.getResult(refId);
  }
}
