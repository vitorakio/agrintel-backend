import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name!: string // "Soja"

  @IsString()
  @IsNotEmpty()
  code!: string // "SOYBEAN"

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class UpdateCropDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  code?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
