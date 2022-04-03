import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { NewsService } from './news.service';
const moment = require('moment-timezone'); 

function formatDate(date, tz = 'Asia/Seoul') {
  const d = moment(date).tz(tz);

  return d.format('yyyy-MM-DD');
}

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('domestic-stocks/:code')
  async getDomesticStocksNews(
    @Param('code') code: string, 
    @Query('start_date') start_date: string, 
    @Query('end_date') end_date:string, 
    @Res() res
  ) {
    let result = await this.newsService.getNews(code, new Date(start_date), new Date(end_date))
    
    if (result !== null) {
      result = result.reduce((acc, cur) => {
        if (!acc[formatDate(cur.time)]) acc[formatDate(cur.time)] = [];
        acc[formatDate(cur.time)].push(cur);
        return acc;
      }, {});
      res.status(HttpStatus.OK).json(result);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'DB error' });
    }
  }

  @Get('chart-options-data/:code')
  async getChartOptionsData(
    @Param('code') code: string, 
    @Query('start_date') start_date: string,
    @Query('end_date') end_date: string,
    @Query('collection') collection: string,
    @Res() res
  ) {
    let result = await this.newsService.getData(code, new Date(start_date), new Date(end_date), collection)

    if (result !== null) {
      const tz = collection.includes('usa') ? 'America/New_York' : 'Asia/Seoul';
      result = result.reduce((acc, cur) => {
        if (!acc[formatDate(cur.time, tz)]) acc[formatDate(cur.time, tz)] = [];
        acc[formatDate(cur.time, tz)].push(cur);
        return acc;
      }, {});
      res.status(HttpStatus.OK).json(result);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'DB error' });
    }
  }
  
  @Get('theme-news/:code')
  async getThemeNews(
    @Param('code') code: string, 
    @Query('start_date') start_date: string, 
    @Query('end_date') end_date:string, 
    @Res() res
  ) {
    let result = await this.newsService.getThemeNews(code, new Date(start_date), new Date(end_date))
    if (result !== null) {
      result = result.reduce((acc, cur) => {
        if (!acc[formatDate(cur.time)]) acc[formatDate(cur.time)] = [];
        acc[formatDate(cur.time)].push(cur);
        return acc;
      }, {});
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'DB error' });
    }
  }
}
