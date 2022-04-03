import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GreeterController } from './greeter.controller';
import { GreeterService } from './greeter.service';

@Module({
  imports: [DatabaseModule],
  providers: [GreeterService],
  controllers: [GreeterController],
})
export class GreeterModule {}
