import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module ';
import { MaquininhasModule } from './maquininhas/maquininhas.module';
import { EmprestimosModule } from './loans/loans.module';

@Module({
  imports: [
    UsersModule,
    MaquininhasModule,
    EmprestimosModule, // <-- ADICIONE AQUI
  ],
})
export class AppModule {}
