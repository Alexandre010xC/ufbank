export enum MaquininhaStatus {
  ESTOQUE = 'ESTOQUE', 
  ATIVA = 'ATIVA',
  MANUTENCAO = 'MANUTENCAO' 
}

export class Maquininha {
  id: number;
  codigoSerial: string; // O número único atrás da máquina (ex: SN123456)
  modelo: string;       // Ex: "Moderninha Pro", "Smart"
  status: MaquininhaStatus;
  clienteId?: number;   // Pode ser nulo se estiver no estoque (sem dono)
}