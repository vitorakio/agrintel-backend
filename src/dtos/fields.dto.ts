import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 10 })
  @Min(0)
  hectares!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  farmId!: number;
}

export class UpdateFieldDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 10 })
  @Min(0)
  hectares?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  farmId?: number;
}

export class FindAllFieldsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  farmId?: number;
}
