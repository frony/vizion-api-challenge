import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ResultService } from './result.service';
@Controller()
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get('/result/:id')
  async read(@Param('id') refId: number) {
    return this.resultService.getResult(refId);
  }

  @Delete('/result/:id')
  async delete(@Param('id') refId: number) {
    return this.resultService.delete(refId);
  }
}
