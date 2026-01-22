import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export enum AreaUnitDto {
  HA = 'HA',
  ALQ = 'ALQ',
}

export class CreateAreaDto {
  @IsInt()
  @IsPositive()
  farmId!: number

  @IsString()
  @IsNotEmpty()
  name!: string

  // Fonte única para cálculo
  @IsNumber()
  @IsPositive()
  areaHa!: number

  // Opcional: auditoria/UX
  @IsEnum(AreaUnitDto)
  @IsOptional()
  originalUnit?: AreaUnitDto

  @IsNumber()
  @IsPositive()
  @IsOptional()
  originalSize?: number
}

export class UpdateAreaDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  areaHa?: number

  @IsEnum(AreaUnitDto)
  @IsOptional()
  originalUnit?: AreaUnitDto

  @IsNumber()
  @IsPositive()
  @IsOptional()
  originalSize?: number
}
