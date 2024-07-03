import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { catchError, firstValueFrom, map } from 'rxjs';
import { validateOrReject } from 'class-validator';
import { CountriesDto } from './dto/countries.dto';
import { CountryDto } from './dto/country.dto';
import { LeaguesDto } from './dto/leagues.dto';

@Injectable()
export class FootballApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<CountryDto[]> {
    const countriesDto: CountriesDto = await firstValueFrom(
      this.httpService
        .get('https://api-football-v1.p.rapidapi.com/v3/countries')
        .pipe(
          catchError(() => {
            throw new Error('Get countries request failed.');
          }),
          map(({ data }) => {
            return plainToInstance(CountriesDto, data);
          }),
        ),
    );

    for (const country of countriesDto.response) {
      await validateOrReject(country);
    }

    return countriesDto.response;
  }

  async getLeague(country: string) {
    const leaguesDto = await firstValueFrom(
      this.httpService
        .get('https://api-football-v1.p.rapidapi.com/v3/leagues', {
          params: { country },
        })
        .pipe(
          catchError(() => {
            throw new Error(`Get league request failed. Country: ${country}`);
          }),
          map(({ data }) => {
            return plainToInstance(LeaguesDto, data);
          }),
        ),
    );

    for (const country of leaguesDto.response) {
      await validateOrReject(country);
    }

    return leaguesDto.response;
  }
}
