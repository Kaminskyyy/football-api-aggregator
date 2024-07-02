import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { assert } from 'console';
import { map, Observable } from 'rxjs';

@Injectable()
export class RequestDurationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const started = Date.now();

    return next.handle().pipe(
      map((data) => {
        assert(typeof data === 'object', 'Handlers must return objects');
        data.requestDuration = Date.now() - started;
        return data;
      }),
    );
  }
}
