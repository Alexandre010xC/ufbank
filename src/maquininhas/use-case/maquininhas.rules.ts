// src/maquininhas/use-case/maquininhas.rules.ts
export class MaquininhasRules {
  static calcularTaxa(lucro: number): number {
    if (lucro <= 3000) return 30;
    if (lucro <= 5000) return 20;
    if (lucro <= 10000) return 10;
    return 7.5;
  }

  static calcularRepasse(taxa: number): number {
    if (taxa === 30) return 5;
    if (taxa === 20) return 10;
    if (taxa === 10) return 20;
    return 30; // para 7.5%
  }

  // função utilitária que retorna ambos os valores
  static calcRatesFromProfit(lucro: number) {
    const interestRate = this.calcularTaxa(lucro);
    const repassePercent = this.calcularRepasse(interestRate);
    return { interestRate, repassePercent };
  }
}
