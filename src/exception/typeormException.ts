import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.message.includes('your_specific_error_message')) {
      // 处理特定错误消息的情况
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Your specific error message',
      });
    } else {
      // 处理其他类型的TypeORM错误
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }
}
