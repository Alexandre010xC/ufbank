import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmprestimosModule } from '../src/loans/loans.module';
import { EmprestimosRepository } from '../src/loans/infra/loans.repository';

describe('Fluxo E2E - Empréstimos (UFBank)', () => {
  let app: INestApplication;
  let repo: EmprestimosRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EmprestimosModule],
    }).compile();

    app = moduleRef.createNestApplication();
    repo = moduleRef.get(EmprestimosRepository);
    await app.init();
  });

  it('deve criar um empréstimo e salvar no "banco"', async () => {
    const response = await request.default(app.getHttpServer())
      .post('/emprestimos')
      .send({
        valorSolicitado: 1000,
        taxaJuros: 10,
        clienteId: 1,
      })
      .expect(201);

    const salvo = repo.buscarPorId(response.body.id);

        expect(salvo).toBeDefined();
        expect(salvo!.valorSolicitado).toBe(1000);
        expect(salvo!.valorJuros).toBe(100);

  });

  afterAll(async () => {
    await app.close();
  });
});
