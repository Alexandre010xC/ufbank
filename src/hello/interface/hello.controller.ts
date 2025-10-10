import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../use-case/hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello() {
    return this.helloService.execute();
  }
}