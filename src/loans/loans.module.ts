import { Module } from '@nestjs/common';
import { EmprestimosController } from './interface/loans.controller';
import { EmprestimosService } from './use-case/loans.service';
import { EmprestimosRepository } from './infra/loans.repository';

@Module({
  controllers: [EmprestimosController],
  providers: [EmprestimosService, EmprestimosRepository],
  exports: [EmprestimosService],
})
export class EmprestimosModule {}
