import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RequestsStatisticsService } from 'src/request-statistics/requests-statistics.service';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(
    private readonly requestsStatisticsService: RequestsStatisticsService,
  ) {
    super();
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();

    await this.requestsStatisticsService.updateStatistics(
      request.method,
      request.url,
      false,
    );

    super.catch(exception, host);
  }
}
