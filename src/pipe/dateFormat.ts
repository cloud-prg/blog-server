// date-formatting.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateFormattingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // 在这里对日期字段进行格式化
        if (data && data.createdAt instanceof Date) {
          data.createdAt = data.createdAt.toLocaleString(); // 或者使用你想要的其他格式
        }
        return data;
      }),
    );
  }
}
