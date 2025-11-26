import { EmprestimosService } from './loans.service';
import { EmprestimosRepository } from '../infra/loans.repository';

describe('Serviço de Empréstimos - Testes Unitários', () => {
  let service: EmprestimosService;

  beforeEach(() => {
    service = new EmprestimosService(new EmprestimosRepository());
  });

  // Particionamento de Equivalência
  it('deve calcular juros corretamente', () => {
    expect(service.calcularJuros(1000, 10)).toBe(100);
  });

  // Valor Limite: abaixo do mínimo
  it('deve rejeitar valor abaixo de 1000', () => {
    expect(() =>
      service.criar({ valorSolicitado: 900, taxaJuros: 10, clienteId: 1 })
    ).toThrow();
  });

  // Valor no limite mínimo
  it('deve aceitar valor de 1000', () => {
    expect(() =>
      service.criar({ valorSolicitado: 1000, taxaJuros: 10, clienteId: 1 })
    ).not.toThrow();
  });

  // Valor no limite máximo
  it('deve aceitar valor de 50000', () => {
    expect(() =>
      service.criar({ valorSolicitado: 50000, taxaJuros: 10, clienteId: 1 })
    ).not.toThrow();
  });

  // Acima do máximo
  it('deve rejeitar valor acima de 50000', () => {
    expect(() =>
      service.criar({ valorSolicitado: 51000, taxaJuros: 10, clienteId: 1 })
    ).toThrow();
  });
});
