import { Injectable } from '@nestjs/common';
import { FootballApiService } from './football-api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaguesStatistics } from 'src/database/entities/leagues-statistics.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Statistics } from './interfaces/statistics.interface';

@Injectable()
export class FootballService {
  private readonly maxCountriesNumber: number;

  constructor(
    private readonly footballApiService: FootballApiService,
    @InjectRepository(LeaguesStatistics)
    private readonly leagueStatisticsRepo: Repository<LeaguesStatistics>,
    configService: ConfigService,
  ) {
    this.maxCountriesNumber = +configService.get('MAX_COUNTRIES_NUM');
  }

  async countLeagues(): Promise<Statistics> {
    const countries = await this.footballApiService.getCountries();

    // Used to avoid firing too much requests.
    // Free api requests limit: 100 per day.
    const countriesSliced = countries.slice(0, this.maxCountriesNumber);

    const leagueRequests = countriesSliced.map((country) =>
      this.footballApiService.getLeague(country.name),
    );
    const results = await Promise.all(leagueRequests);

    const totalLeagues = results.reduce((previous, current) => {
      return (previous += current.length);
    }, 0);

    const leaguesStatistics = this.leagueStatisticsRepo.create({
      totalLeagues,
    });
    await leaguesStatistics.save();

    return { totalLeagues };
  }
}
