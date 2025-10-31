import { Module } from '@nestjs/common';
import { UsersService } from './use-case/users.service';
import { UsersController } from './interface/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
