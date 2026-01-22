import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator'

export class CreateFieldDto {
  @IsInt()
  @IsPositive()
  farmId!: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  areaId?: number

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsNumber()
  @IsPositive()
  areaHa!: number
}

export class UpdateFieldDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  farmId?: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  areaId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  areaHa?: number
}

export class FindAllFieldsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  farmId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  areaId?: number
}
