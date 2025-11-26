// src/maquininhas/use-case/create-machine.usecase.ts
import { MachinesRepository } from '../../maquininhas/infra/maquininha.repository';
import { Maquininha } from '../../maquininhas/domain/entity/maquininha.entity';
import { MaquininhasRules } from './maquininhas.rules';

export class CreateMachineUseCase {
  constructor(private repo: MachinesRepository) {}

  execute(dto: {
    modelo: string;
    codigoSerial: string;
    status?: any;
    clienteId?: number | null;
    monthlyProfit?: number;
  }): Maquininha {
    const monthlyProfit = dto.monthlyProfit ?? 0;
    const { interestRate, repassePercent } = MaquininhasRules.calcRatesFromProfit(monthlyProfit);

    // chame o repositório passando um objeto (propriedades nomeadas)
    return this.repo.create({
      modelo: dto.modelo,
      codigoSerial: dto.codigoSerial,
      status: dto.status,
      clienteId: dto.clienteId ?? null,
      monthlyProfit,
      interestRate,
      repassePercent,
    });
  }
}
