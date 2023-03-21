import { Controller, Post, Body } from '@nestjs/common';
import { ReferenceService } from './reference.service';

@Controller()
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post()
  create(@Body('url') refUrl: string) {
    return this.referenceService.create(refUrl);
  }
}
