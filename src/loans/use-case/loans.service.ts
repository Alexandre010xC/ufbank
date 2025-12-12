import { Injectable, BadRequestException } from '@nestjs/common';
import { CriarEmprestimoDto } from '../domain/dto/create-loan.dto';
import { Emprestimo, StatusEmprestimo } from '../domain/entity/loan.entity';
import { EmprestimosRepository } from '../infra/loans.repository';
import { RegrasEmprestimo } from './loans.rules';

@Injectable()
export class EmprestimosService {
  constructor(private readonly repo: EmprestimosRepository) {}

  calcularJuros(valor: number, taxa: number): number {
    return RegrasEmprestimo.calcularValorDoJuros(valor, taxa);
  }

  criar(dto: CriarEmprestimoDto): Emprestimo {
    // Valida limites (testes de borda)
    if (dto.valorSolicitado < 1000 || dto.valorSolicitado > 50000) {
      throw new BadRequestException('Valor do empréstimo fora dos limites permitidos.');
    }

    const valorJuros = this.calcularJuros(dto.valorSolicitado, dto.taxaJuros);

    const emprestimo = new Emprestimo(
      this.repo.gerarId(),
      dto.clienteId,
      dto.valorSolicitado,
      dto.taxaJuros,
      valorJuros,
      StatusEmprestimo.PENDENTE,
      new Date()
    );

    this.repo.criar(emprestimo);

    return emprestimo;
  }

  buscarPorId(id: number) {
    return this.repo.buscarPorId(id);
  }

  todos() {
    return this.repo.todos();
  }
}
