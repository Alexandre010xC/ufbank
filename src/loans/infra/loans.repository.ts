import { Emprestimo } from '../domain/entity/loan.entity';

export class EmprestimosRepository {
  private lista: Emprestimo[] = [];
  private idAtual = 1;

  criar(emprestimo: Emprestimo) {
    this.lista.push(emprestimo);
  }

  gerarId() {
    return this.idAtual++;
  }

  buscarPorId(id: number): Emprestimo | undefined {
    return this.lista.find(e => e.id === id);
  }

  todos() {
    return this.lista;
  }
}
