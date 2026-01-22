import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { SeasonsService } from './seasons.service'
import { CreateSeasonDto, UpdateSeasonDto } from 'src/dtos/seasons.dto'

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly service: SeasonsService) {}

  @Post()
  create(@Body() dto: CreateSeasonDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSeasonDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
