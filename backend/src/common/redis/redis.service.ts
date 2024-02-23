import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CreateRedisRecordDto } from './dto/create-redis.dto';

@Injectable()
export class RedisService {
  private readonly redis = new Redis({
    host: 'redis-container',
    port: 6379,
  });

  async findOne(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async setValue(createRedisRecordDto: CreateRedisRecordDto) {
    const { key, value, expires } = createRedisRecordDto;
    return await this.redis.set(key, value, 'EX', expires);
  }

  async delete(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
