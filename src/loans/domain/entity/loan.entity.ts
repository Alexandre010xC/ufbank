export enum StatusEmprestimo {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  REJEITADO = 'REJEITADO',
}

export class Emprestimo {
  constructor(
    public id: number,
    public clienteId: number,
    public valorSolicitado: number,
    public taxaJuros: number,
    public valorJuros: number,
    public status: StatusEmprestimo,
    public criadoEm: Date
  ) {}
}
