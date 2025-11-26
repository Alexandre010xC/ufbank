import { IsNumber, Min, Max } from 'class-validator';

export class CriarEmprestimoDto {
  @IsNumber()
  @Min(1000, { message: 'O valor mínimo do empréstimo é R$ 1.000,00.' })
  @Max(50000, { message: 'O valor máximo do empréstimo é R$ 50.000,00.' })
  valorSolicitado: number;

  @IsNumber()
  taxaJuros: number;

  @IsNumber()
  clienteId: number;
}
