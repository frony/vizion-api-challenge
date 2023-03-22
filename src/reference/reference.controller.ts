import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReferenceService } from './reference.service';

@Controller()
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post()
  create(@Body('url') refUrl: string) {
    return this.referenceService.create(refUrl);
  }

  @Get(':id')
  read(@Param('id') refId: number) {
    return this.referenceService.getById(refId);
  }

  @Delete(':id')
  delete(@Param('id') refId: number) {
    return this.referenceService.delete(refId);
  }
}
