import { Module } from '@nestjs/common';
import { HelloController } from './interface/hello.controller';
import { HelloService } from './use-case/hello.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}