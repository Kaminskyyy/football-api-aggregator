import { IsBoolean } from 'class-validator';

export class FixturesDto {
  @IsBoolean()
  events: boolean;

  @IsBoolean()
  lineups: boolean;

  @IsBoolean()
  statistics_fixtures: boolean;

  @IsBoolean()
  statistics_players: boolean;
}
