import { Controller, Get } from '@nestjs/common';
import { FootballService } from './football.service';
import { Statistics } from './interfaces/statistics.interface';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get('statistics')
  async getStatistics(): Promise<Statistics> {
    return this.footballService.countLeagues();
  }

  @Get('qwerty')
  test() {
    return {};
  }
}
