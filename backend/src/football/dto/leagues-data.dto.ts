import { Type } from 'class-transformer';
import { LeagueDto } from './league.dto';
import { CountryDto } from './country.dto';
import { ValidateNested } from 'class-validator';
import { SeasonDto } from './season.dto';

export class LeaguesDataDto {
  @Type(() => LeagueDto)
  @ValidateNested()
  league: LeagueDto;

  @Type(() => CountryDto)
  @ValidateNested()
  country: CountryDto;

  @Type(() => SeasonDto)
  @ValidateNested()
  seasons: SeasonDto[];
}
