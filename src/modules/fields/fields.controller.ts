import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import {
  CreateFieldDto,
  FindAllFieldsQueryDto,
  UpdateFieldDto,
} from 'src/dtos/fields.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly service: FieldsService) {}

  @Post()
  create(@Body() dto: CreateFieldDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: FindAllFieldsQueryDto) {
    return this.service.findAll(query.farmId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFieldDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
