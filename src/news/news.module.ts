import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [],
  providers: [NewsService, DatabaseService],
  controllers: [NewsController],
})
export class NewsModule {}
