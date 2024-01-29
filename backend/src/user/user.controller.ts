import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { UtilityService } from '@@nest/common/services/utility.service';

@Controller('users')
@ApiTags('/users')
@SummarizeApiResponse()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly utilityService: UtilityService,
  ) { }

  @Get('/me')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (自分)' })
  @ApiResponse({
    status: 200,
    description: '自分のプロフィール情報を返却',
    type: User,
  })
  findMyProfile(
    @Request() req,
  ) {
    const authorizationHeader: string = req.headers.authorization;
    if (!authorizationHeader) throw new BadRequestException;

    const bearerToken: string = this.utilityService.getBearerToken(authorizationHeader);
    return this.userService.findMyProfile(bearerToken);
  }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したユーザー情報を返却',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みユーザー情報を全数返却',
    type: User,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('email/:email')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (メールアドレス)' })
  @ApiParam({
    name: 'email',
    type: String,
    example: 'john@example.com',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたメールアドレスのユーザー情報を返却',
    type: User,
  })
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('id/:id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (ID)' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのユーザー情報を返却',
    type: User,
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体更新API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '更新後のユーザー情報を返却',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体削除API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '削除後のユーザー情報を返却',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
