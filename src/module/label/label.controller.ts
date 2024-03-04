import { Controller, Get } from '@nestjs/common';
import { LabelService } from './label.service';

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) { }

  @Get('getCategories')
  getCategories() {
    return this.labelService.getCategories();
  }
}
