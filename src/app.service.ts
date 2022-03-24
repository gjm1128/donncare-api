import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const url = this.configService.get('API_URL');
    console.log(url);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
