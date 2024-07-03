import { Controller, Get } from '@nestjs/common';
import { RequestsStatisticsService } from './requests-statistics.service';

@Controller('requests-statistics')
export class RequestsStatisticsController {
  constructor(
    private readonly requestsStatisticsService: RequestsStatisticsService,
  ) {}

  @Get()
  getStatistics() {
    return this.requestsStatisticsService.findStatistics();
  }
}
