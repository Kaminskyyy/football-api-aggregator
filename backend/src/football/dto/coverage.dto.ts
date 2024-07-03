import { Type } from 'class-transformer';
import { FixturesDto } from './fixtures.dto';
import { IsBoolean, ValidateNested } from 'class-validator';

export class CoverageDto {
  @Type(() => FixturesDto)
  @ValidateNested()
  fixtures: FixturesDto;

  @IsBoolean()
  standings: boolean;

  @IsBoolean()
  players: boolean;

  @IsBoolean()
  top_scorers: boolean;

  @IsBoolean()
  top_assists: boolean;

  @IsBoolean()
  top_cards: boolean;

  @IsBoolean()
  injuries: boolean;

  @IsBoolean()
  predictions: boolean;

  @IsBoolean()
  odds: boolean;
}
