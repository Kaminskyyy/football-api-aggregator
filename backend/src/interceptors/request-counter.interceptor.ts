import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestsStatisticsService } from 'src/request-statistics/requests-statistics.service';

@Injectable()
export class RequestsCounterInterceptor implements NestInterceptor {
  constructor(
    private readonly requestStatisticsService: RequestsStatisticsService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        const request = context.switchToHttp().getRequest();
        await this.requestStatisticsService.updateStatistics(
          request.method,
          request.url,
          true,
        );
      }),
    );
  }
}
