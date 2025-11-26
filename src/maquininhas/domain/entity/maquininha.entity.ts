export enum MaquininhaStatus {
  ESTOQUE = 'ESTOQUE',
  ATIVA = 'ATIVA',
  MANUTENCAO = 'MANUTENCAO'
}

export class Maquininha {
  constructor(
    public id: number,
    public modelo: string,
    public status: MaquininhaStatus,
    public codigoSerial: string,
    public clienteId: number | null,
    public monthlyProfit: number,
    public interestRate: number,
    public repassePercent: number,
  ) {}
}
