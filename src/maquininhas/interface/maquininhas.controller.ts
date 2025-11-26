import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { MaquininhasService } from '../use-case/maquininhas.service';
import { CreateMaquininhaDto } from '../domain/dto/create-maquininha.dto';
import { UpdateMaquininhaDto } from '../domain/dto/update-maquininha.dto';

@Controller('maquininhas')
export class MaquininhasController {
  constructor(private service: MaquininhasService) {}

  @Post()
  create(@Body() dto: CreateMaquininhaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMaquininhaDto) {
    return this.service.update(id, dto);
  }
}
