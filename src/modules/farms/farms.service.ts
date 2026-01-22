import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateFarmDto, UpdateFarmDto } from '../../dtos/farms.dto'

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFarmDto) {
    if (!dto) {
      throw new BadRequestException('Request body is required')
    }

    return this.prisma.farm.create({
      data: { name: dto.name, location: dto.location },
    })
  }

  findAll() {
    return this.prisma.farm.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async findOne(id: number) {
    const farm = await this.prisma.farm.findUnique({ where: { id } })
    if (!farm) throw new NotFoundException('Farm not found')
    return farm
  }

  async update(id: number, dto: UpdateFarmDto) {
    await this.findOne(id)
    return this.prisma.farm.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.location !== undefined ? { location: dto.location } : {}),
      },
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.farm.delete({ where: { id } })
  }
}
