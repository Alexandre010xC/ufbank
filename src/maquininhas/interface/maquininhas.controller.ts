import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { IMaquininhasService } from '../use-case/imaquininhas.service';
import { CreateMaquininhaDto } from '../domain/dto/create-maquininha.dto';
// import { RolesGuard } from '../../auth/roles.guard'; // Descomente quando usar
// import { Roles } from '../../auth/roles.decorator';
// import { UserRole } from '../../users/domain/entity/user.entity';

@Controller('maquininhas')
// @UseGuards(RolesGuard) // Ative quando a Auth estiver pronta
export class MaquininhasController {
  constructor(private readonly maquininhasService: IMaquininhasService) {}

  @Post()
  // @Roles(UserRole.ADMIN)
  create(@Body() createMaquininhaDto: CreateMaquininhaDto) {
    return this.maquininhasService.create(createMaquininhaDto);
  }

  @Get()
  // @Roles(UserRole.ADMIN) 
  findAll() {
    return this.maquininhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquininhasService.findOne(+id);
  }
}