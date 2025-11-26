import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmprestimosService } from '../use-case/loans.service';
import { CriarEmprestimoDto } from '../domain/dto/create-loan.dto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly service: EmprestimosService) {}

  @Post()
  criar(@Body() dto: CriarEmprestimoDto) {
    return this.service.criar(dto);
  }

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.service.buscarPorId(id);
  }

  @Get()
  listar() {
    return this.service.todos();
  }
}
