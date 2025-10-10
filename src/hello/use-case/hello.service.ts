import { Injectable } from '@nestjs/common';
import { Hello } from '../domain/hello.entity';

@Injectable()
export class HelloService {
  execute(): Hello {
    return new Hello('Hello World!');
  }
}