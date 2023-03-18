import { Controller, Post, Body } from '@nestjs/common';
import { ReferenceService} from "./reference.service";

@Controller()
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post()
  reference(@Body('url') refUrl: string) {
    return this.referenceService.insertReference(refUrl);
  }
}
