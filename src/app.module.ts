import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MaquininhasModule } from './maquininhas/maquininhas.module';

@Module({
  imports: [UsersModule, MaquininhasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
