import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class Member {
  @ApiProperty({
    example: '1',
    description: 'メンバーID',
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  groupId: number;
}

export class MemberResponse extends Member { }
