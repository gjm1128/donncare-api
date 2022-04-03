import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService {
  public mongodb;

  constructor(private configService: ConfigService) {
    MongoClient.connect(
      this.configService.get('MONGO_URI'),
      { maxPoolSize: 200, minPoolSize: 5 },
      (err, database) => {
        if (err) throw err;
        this.mongodb = database;
      },
    );
  }

  async findAll(dbName, collectionName) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find({}).toArray();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async find(dbName, collectionName, query) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find(query).toArray();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async findOne(dbName, collectionName, query) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.findOne(query);
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async findWithSort(dbName, collectionName, query, sort) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find(query).sort(sort).toArray();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async findWithOptionAndSort(dbName, collectionName, query, option, sort) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find(query, option).sort(sort).toArray();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  aggregate(dbName, collectionName, pipeline) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      return collection.aggregate(pipeline);
    } catch (error) {
      console.log(`Exception : ${error}`);
      throw error;
    }
  }

  async findWithLimitAndSort(dbName, collectionName, query, limit, sort) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection
        .find(query)
        .limit(limit)
        .sort(sort)
        .toArray();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async count(dbName, collectionName, query) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find(query).count();
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async insertOne(dbName, collectionName, query) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(query);
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async updateOne(dbName, collectionName, query, update) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.updateOne(
        query,
        { $set: update },
        { upsert: true },
      );
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async incOne(dbName, collectionName, query, inc) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.updateOne(query, { $inc: inc });
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }

  async deleteOne(dbName, collectionName, query) {
    let db;
    try {
      db = this.mongodb.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.deleteOne(query);
      return result;
    } catch (error) {
      if (error) {
        console.log(`Exception : ${error}`);
        throw error;
      }
    }
  }
}
