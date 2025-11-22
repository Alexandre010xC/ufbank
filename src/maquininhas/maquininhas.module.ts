import { Module } from '@nestjs/common';
import { MaquininhasService } from './use-case/maquininhas.service';
import { IMaquininhasService } from './use-case/imaquininhas.service';
import { MaquininhasController } from './interface/maquininhas.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MaquininhasController],
  providers: [
    {
      provide: IMaquininhasService, 
      useClass: MaquininhasService, 
    },
  ],
  exports: [IMaquininhasService], 
})
export class MaquininhasModule {}