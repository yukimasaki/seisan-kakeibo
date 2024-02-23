import { Test, TestingModule } from '@nestjs/testing';
import { InviteService } from './invite.service';
import { RedisService } from 'src/common/redis/redis.service';
import { CreateRedisRecordDto } from 'src/common/redis/dto/create-redis.dto';

describe('InviteService', () => {
  let service: InviteService;
  let redisService: RedisService;

  beforeEach(async () => {
    // RedisServiceのモックを作成
    const redisServiceMock = {
      findOne: jest.fn().mockResolvedValue('Hello world!!'),
      setValue: jest.fn().mockResolvedValue('OK'),
      delete: jest.fn().mockResolvedValue(1),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteService,
        // 実際のRedisServiceの代わりにモックを提供
        { provide: RedisService, useValue: redisServiceMock },
      ],
    }).compile();

    service = module.get<InviteService>(InviteService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call setValue on RedisService with correct parameters', async () => {
      const createRedisRecordDto: CreateRedisRecordDto = {
        key: 'newKey',
        value: 'New Value',
        expires: 5000,
      };
      const result = await service.create(createRedisRecordDto);
      expect(result).toEqual('OK');
      expect(redisService.setValue).toHaveBeenCalledWith(createRedisRecordDto);
    });
  });

  describe('findOne', () => {
    it('should return a value from RedisService', async () => {
      const key = 'testKey';
      await expect(service.findOne(key)).resolves.toEqual('Hello world!!');
      expect(redisService.findOne).toHaveBeenCalledWith(key);
    });
  });

  describe('delete', () => {
    it('should return a value from RedisService', async () => {
      const key = 'testKey';
      await expect(service.remove(key)).resolves.toEqual(1);
      expect(redisService.delete).toHaveBeenCalledWith(key);
    });
  });
});
