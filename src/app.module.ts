import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GreeterModule } from './greeter/greeter.module';
import { NewsModule } from './news/news.module';
// import { WrappedDatabaseModule } from './wrapped-database/wrapped-database.module';

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
    NewsModule,
    // WrappedDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
