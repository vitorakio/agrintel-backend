import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateMarketPriceDto {
  @IsInt()
  @IsPositive()
  seasonId!: number

  @IsDateString()
  date!: string

  @IsNumber()
  @IsPositive()
  pricePerSack!: number

  @IsString()
  @IsOptional()
  source?: string

  @IsString()
  @IsOptional()
  region?: string
}

export class UpdateMarketPriceDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  seasonId?: number

  @IsDateString()
  @IsOptional()
  date?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  pricePerSack?: number

  @IsString()
  @IsOptional()
  source?: string

  @IsString()
  @IsOptional()
  region?: string
}
