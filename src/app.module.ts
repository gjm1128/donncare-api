import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GreeterController } from './greeter/greeter.controller';
import { GreeterModule } from './greeter/greeter.module';
import { GreeterService } from './greeter/greeter.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env'
          : process.env.NODE_ENV === 'stage'
          ? 'stage.env'
          : 'local.env',
    }),
    DatabaseModule,
    GreeterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
