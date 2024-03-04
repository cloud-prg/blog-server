// error.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch() // catch装饰器不填参数则捕获所有类型异常，也可以传入错误类型做单独捕获@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message = '请求发生错误';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // 对捕获的异常做区分处理 
    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
      case TypeORMError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as TypeORMError).message;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: 1,
    });
  }
}