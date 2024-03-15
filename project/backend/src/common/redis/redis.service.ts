import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const result = await this.redis.set(key, value, 'EX', expires);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async delete(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
