import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: (process.env.NODE_ENV === 'production') ? '.env'
    : (process.env.NODE_ENV === 'stage') ? 'stage.env' : 'local.env',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
