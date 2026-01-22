import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateSeedVarietyDto {
  @IsInt()
  @IsPositive()
  cropId!: number

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsOptional()
  brand?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class UpdateSeedVarietyDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  cropId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  brand?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
