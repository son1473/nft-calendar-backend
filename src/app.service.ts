import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  sayHello(): string {
    return 'Hello Nest! this is MG!';
  }
}
