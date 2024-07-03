import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CoverageDto } from './coverage.dto';
import { Type } from 'class-transformer';

export class SeasonDto {
  @IsNumber()
  year: number;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsBoolean()
  current: boolean;

  @Type(() => CoverageDto)
  @ValidateNested()
  coverage: CoverageDto;
}
