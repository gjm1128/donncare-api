import { Injectable } from '@nestjs/common';

@Injectable()
export class GreeterService {
  getHello(): string {
    return 'Hello World!';
  }
}
