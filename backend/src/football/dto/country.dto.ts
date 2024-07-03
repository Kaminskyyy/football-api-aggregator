import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CountryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string | null;

  @IsOptional()
  @IsUrl()
  flag: string | null;
}
