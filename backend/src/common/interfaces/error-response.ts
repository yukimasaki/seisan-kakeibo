import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {
  @ApiProperty({
    example: '404',
    description: 'HTTPステータスコードを表す番号',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'HTTPステータスコードの説明',
  })
  statusCode: number;
}
