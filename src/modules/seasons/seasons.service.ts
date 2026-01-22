import { Injectable, NotFoundException } from '@nestjs/common'
import { Season } from '@prisma/client'
import { CreateSeasonDto } from 'src/dtos/seasons.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SeasonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSeasonDto): Promise<Season> {
    const field = await this.prisma.field.findUnique({
      where: { id: dto.fieldId },
    })

    if (!field) throw new NotFoundException('Field not found')

    return this.prisma.season.create({
      data: dto,
    })
  }
}
