import { EmprestimosService } from './loans.service';
import { EmprestimosRepository } from '../infra/loans.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('Serviço de Empréstimos - Testes Unitários', () => {
  let service: EmprestimosService;

  // 1. Criamos um "Dublê" (Mock) do Repositório para não depender do banco/infra real
  const mockRepo = {
    gerarId: jest.fn().mockReturnValue(1),
    criar: jest.fn(), // Simula o método criar sem fazer nada
  };

  beforeEach(async () => {
    // Configuração do Módulo de Teste (Simulando a DI do NestJS)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmprestimosService,
        {
          provide: EmprestimosRepository, // Quando alguém pedir o Repositório...
          useValue: mockRepo,             // ...entregue este Mock!
        },
      ],
    }).compile();

    service = module.get<EmprestimosService>(EmprestimosService);
  });

  // --- Cenário: Cálculo de Juros ---
  it('deve calcular juros corretamente (Particionamento de Equivalência)', () => {
    // Validamos se calcularJuros(1000, 10) retorna 100
    expect(service.calcularJuros(1000, 10)).toBe(100);
  });

  // --- Cenário: Análise de Valor Limite (BVA) ---
  // Limites permitidos: 1.000 a 50.000

  // Borda Inferior Inválida
  it('deve rejeitar valor de 999.99 (abaixo do mínimo)', () => {
    expect(() =>
      service.criar({ valorSolicitado: 999.99, taxaJuros: 10, clienteId: 1 })
    ).toThrow(BadRequestException);
  });

  // Borda Inferior Válida
  it('deve aceitar valor de 1000 (limite mínimo exato)', () => {
    expect(() =>
      service.criar({ valorSolicitado: 1000, taxaJuros: 10, clienteId: 1 })
    ).not.toThrow();
  });

  // Borda Superior Válida
  it('deve aceitar valor de 50000 (limite máximo exato)', () => {
    expect(() =>
      service.criar({ valorSolicitado: 50000, taxaJuros: 10, clienteId: 1 })
    ).not.toThrow();
  });

  // Borda Superior Inválida
  it('deve rejeitar valor de 50000.01 (acima do máximo)', () => {
    expect(() =>
      service.criar({ valorSolicitado: 50000.01, taxaJuros: 10, clienteId: 1 })
    ).toThrow(BadRequestException);
  });
});
