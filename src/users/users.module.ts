import { Module } from '@nestjs/common';
import { UsersService } from './use-case/users.service';
import { UsersController } from './interface/users.controller';
import { IUsersService } from './use-case/iusers.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: IUsersService,  
      useClass: UsersService,  
    },
  ],
  exports: [IUsersService]
})
export class UsersModule {}
