import { ValidateNested } from 'class-validator';
import { CountryDto } from './country.dto';
import { Type } from 'class-transformer';

export class CountriesDto {
  @Type(() => CountryDto)
  @ValidateNested()
  response: CountryDto[];
}
