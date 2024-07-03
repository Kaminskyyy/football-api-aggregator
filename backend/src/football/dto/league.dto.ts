import { IsNumber, IsString, IsUrl } from 'class-validator';

export class LeagueDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsUrl()
  logo: string;
}
