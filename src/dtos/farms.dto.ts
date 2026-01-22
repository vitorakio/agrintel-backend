import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsOptional()
  location?: string
}

export class UpdateFarmDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  location?: string
}
