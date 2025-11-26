export class RegrasEmprestimo {
  static calcularValorDoJuros(valor: number, taxa: number): number {
    return (valor * taxa) / 100;
  }
}
