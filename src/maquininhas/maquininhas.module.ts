import { Module } from '@nestjs/common';
import { MaquininhasService } from './use-case/maquininhas.service';
import { MaquininhasController } from './interface/maquininhas.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MaquininhasController],
  providers: [MaquininhasService],
})
export class MaquininhasModule {}
