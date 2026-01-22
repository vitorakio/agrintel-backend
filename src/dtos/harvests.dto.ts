import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateHarvestDto {
  @IsInt()
  @IsPositive()
  seasonId!: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  seedVarietyId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsDateString()
  harvestDate!: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  yieldSc?: number
}

export class UpdateHarvestDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  seasonId?: number

  @IsInt()
  @IsPositive()
  @IsOptional()
  seedVarietyId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsDateString()
  @IsOptional()
  harvestDate?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  yieldSc?: number
}
