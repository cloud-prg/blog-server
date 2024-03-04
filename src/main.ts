/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ResponseInterceptor } from './interceptor';
import { AllExceptionsFilter } from './exception/errorException';

const CONNECTION_PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = CONNECTION_PORT;
  await app.listen(port);
  Logger.log(
    `🚀🚀🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
