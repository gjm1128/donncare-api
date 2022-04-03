import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

function convertCodeToArray(code) {
  let codes = [];

  if (code === undefined) {
    return codes;
  }

  if (Array.isArray(code)) {
    codes = code;
  } else {
    codes = code.split(',');
  }
  return codes;
}

@Injectable()
export class NewsService {
  constructor(private databaseService: DatabaseService) {}

  getNews(code: string, start_date: Date, end_date: Date): Promise<any> {
    const codes = convertCodeToArray(code);
    
    const query = {
      code: { $in: codes },
      time: {
        $gte: start_date,
        $lt: new Date(end_date.setDate(end_date.getDate() + 1)),
      },
    };
    const sort = { time: -1 };
    return this.databaseService.findWithSort('donn', 'domestic_stocks_newses', query, sort);
  }

  getData(code: string, start_date: Date, end_date: Date, collection: string): Promise<any> {
    const codes = convertCodeToArray(code);
    const query = {
      code: { $in: codes },
      time: {
        $gte: start_date,
        $lt: new Date(end_date.setDate(end_date.getDate() + 1)),
      },
    };
    const sort = { time: -1 };

    return this.databaseService.findWithSort('donn', collection, query, sort);
  }

  async getThemeNews(code: string, start_date: Date, end_date: Date): Promise<any> {
    const codes = convertCodeToArray(code);

    const pipeline = [
      {
        $project: {
          code: 1, title: 1, url: 1, m_url: 1, publisher: 1, time: 1,
        },
      },
      {
        $match: {
          code: { $in: codes },
          time: {
            $gte: start_date,
            $lt: new Date(end_date.setDate(end_date.getDate() + 1)),
          },
        },
      },
      { $sort: { time: 1 } },
      {
        $group: {
          _id: { title: '$title' },
          title: { $first: '$title' },
          time: { $first: '$time' },
          publisher: { $first: '$publisher' },
          url: { $first: '$url' },
          m_url: { $first: '$m_url' },
        },
      },
      { $sort: { time: -1 } },
    ];
    const aggCursor = this.databaseService.aggregate('donn', 'domestic_stocks_newses', pipeline);
    let result = [];
    for await (const doc of aggCursor) {
      result.push(doc);
    }
    
    return result
  }
}
