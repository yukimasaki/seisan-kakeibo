export class RedisRecord {
  key: string;
  value: string;
  expires: number;
}

export class RedisRecordResponse extends RedisRecord {}
