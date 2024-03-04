import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService , private configService: ConfigService) {}

  @Get('getConfig')
  getConfig() {
    const database = this.configService.get('database');
    return database;
  }
}
