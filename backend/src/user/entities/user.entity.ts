import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";

export class User {
  @ApiProperty({
    example: '1',
    description: 'ユーザーID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'b3d7a9bc-bf21-49d3-a7f8-b15b85d69ea4',
    description: 'Keycloak ユーザーID',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'メールアドレス',
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'Jhon Doe',
    description: '',
  })
  @IsString()
  @MaxLength(255)
  userName: string;

  @ApiProperty({
    example: 'free',
    description: '',
    enum: ['free', 'premium'],
  })
  @IsString()
  membership: string;

  @ApiProperty({
    example: '$2a$12$jA9fyFy1qfh379BEfaJM2uGPe9EnqrEZnREv1iaiX8nyCmQz69ERK',
    description: 'ハッシュ化されたパスワード',
  })
  @IsString()
  hashedPassword: string;
}

export class UserResponse extends User { }

export class UserOmitPassword extends OmitType(User, ['hashedPassword']) { }
