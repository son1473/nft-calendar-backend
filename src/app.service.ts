import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayHello(): string {
    return 'Hello Nest! this is MG!';
  }
}
