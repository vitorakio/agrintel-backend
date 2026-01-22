import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateSeasonDto {
  @IsInt()
  @IsPositive()
  farmId!: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  fieldId?: number

  @IsInt()
  @IsPositive()
  cropId!: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  seedVarietyId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsDateString()
  startDate!: string

  @IsDateString()
  endDate!: string

  // MVP: produção estimada
  @IsNumber()
  @IsPositive()
  @IsOptional()
  productivityScHa?: number

  // Para safra por fazenda sem fieldId: permite definir área usada
  @IsNumber()
  @IsPositive()
  @IsOptional()
  areaHaOverride?: number

  @IsString()
  @IsOptional()
  region?: string
}

export class UpdateSeasonDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  farmId?: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  fieldId?: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  cropId?: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  seedVarietyId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsDateString()
  @IsOptional()
  startDate?: string

  @IsDateString()
  @IsOptional()
  endDate?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  productivityScHa?: number

  @IsNumber()
  @IsPositive()
  @IsOptional()
  areaHaOverride?: number

  @IsString()
  @IsOptional()
  region?: string
}
