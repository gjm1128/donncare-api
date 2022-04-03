import { Controller, Get } from '@nestjs/common';
import { GreeterService } from './greeter.service';

@Controller('greeter')
export class GreeterController {
  constructor(private readonly greeterService: GreeterService) {}

  @Get()
  getHello(): string {
    return this.greeterService.getHello();
  }
}
