import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmprestimosModule } from '../src/loans/loans.module';
import { EmprestimosRepository } from '../src/loans/infra/loans.repository';

describe('Fluxo E2E - Empréstimos (UFBank)', () => {
  let app: INestApplication;
  let repo: EmprestimosRepository;

  beforeAll(async () => {
    // Monta o módulo "real" para o teste E2E (sem mocks, usando a infra real)
    const moduleRef = await Test.createTestingModule({
      imports: [EmprestimosModule],
    }).compile();

    app = moduleRef.createNestApplication();
    // Acessamos o repositório para verificar o "efeito colateral" no banco
    repo = moduleRef.get(EmprestimosRepository);
    await app.init();
  });

  it('deve realizar o fluxo completo de solicitação de empréstimo', async () => {
    // Passo 1: Enviar um POST para /loans (simulando o App do usuário)
    const response = await request
      .default(app.getHttpServer())
      .post('/emprestimos')
      .send({
        valorSolicitado: 2500,
        taxaJuros: 10,
        clienteId: 1,
      })
      // Passo 2: Verificar se a API retorna 201 Created
      .expect(201);

    // Passo 3: Conectar no banco de dados (real) e verificar se a proposta foi criada
    // Como estamos usando um repositório em memória, acessamos ele diretamente.
    const emprestimoSalvo = repo.buscarPorId(response.body.id);

    expect(emprestimoSalvo).toBeDefined();
    expect(emprestimoSalvo!.valorSolicitado).toBe(2500);
    expect(emprestimoSalvo!.status).toBe('PENDENTE');
  });

  afterAll(async () => {
    await app.close();
  });
});
