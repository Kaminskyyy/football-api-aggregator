import { ValidateNested } from 'class-validator';
import { LeaguesDataDto } from './leagues-data.dto';
import { Type } from 'class-transformer';

export class LeaguesDto {
  @Type(() => LeaguesDataDto)
  @ValidateNested()
  response: LeaguesDataDto[];
}
