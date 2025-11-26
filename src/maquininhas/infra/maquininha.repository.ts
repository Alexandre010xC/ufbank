// src/maquininhas/infra/maquininha.repository.ts
import { Maquininha, MaquininhaStatus } from '../domain/entity/maquininha.entity';

interface CreateMachineData {
  modelo: string;
  codigoSerial: string;
  status?: MaquininhaStatus;
  clienteId?: number | null;
  monthlyProfit?: number;
  interestRate?: number;
  repassePercent?: number;
}

export class MachinesRepository {
  private machines: Maquininha[] = [];
  private currentId = 1;

  create(data: CreateMachineData): Maquininha {
    const m = new Maquininha(
      this.currentId++,
      data.modelo,
      data.status ?? MaquininhaStatus.ESTOQUE, // << status na posição correta
      data.codigoSerial,
      data.clienteId ?? null,
      data.monthlyProfit ?? 0,
      data.interestRate ?? 0,
      data.repassePercent ?? 0,
    );
    this.machines.push(m);
    return m;
  }

  // ... resto do repo
}
