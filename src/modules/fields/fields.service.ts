import { Injectable, NotFoundException } from '@nestjs/common';
import { Field } from '@prisma/client';
import { CreateFieldDto, UpdateFieldDto } from 'src/dtos/fields.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFieldDto): Promise<Field> {
    const farm = await this.prisma.farm.findUnique({
      where: {
        id: dto.farmId,
      },
    });

    if (!farm) throw new NotFoundException('Farm not found');

    return this.prisma.field.create({
      data: {
        name: dto.name,
        hectares: dto.hectares,
        farmId: dto.farmId,
      },
    });
  }

  findAll(farmId?: number) {
    return this.prisma.field.findMany({
      where: farmId ? { farmId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const field = await this.prisma.field.findUnique({ where: { id } });

    if (!field) throw new NotFoundException('Field not found');

    return field;
  }

  async update(id: number, dto: UpdateFieldDto) {
    await this.findOne(id);

    return this.prisma.field.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.field.delete({ where: { id } });
  }
}
