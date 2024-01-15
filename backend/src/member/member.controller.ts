import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Member } from './entities/member.entity';

@Controller('members')
@ApiTags('/members')
@SummarizeApiResponse()
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したメンバー情報を返却',
    type: Member,
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '所属メンバー取得API' })
  @ApiResponse({
    status: 200,
    description: '指定されたグループIDに所属するメンバー情報を返却',
    type: Member,
  })
  @ApiQuery({
    name: 'groupId',
    type: String,
    example: '1',
  })
  findByGroupId(
    @Query('groupId') groupId: string,
  ) {
    return this.memberService.findByGroupId(
      +groupId,
    );
  }

  @Get(':userId/:groupId')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: '1',
  })
  @ApiParam({
    name: 'groupId',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたユーザーIDとグループIDの組み合わせのメンバー情報を返却',
    type: Member,
  })
  findOne(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.memberService.findOne(
      +userId,
      +groupId,
    );
  }

  @Patch(':userId/:groupId')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体更新API' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: '1',
  })
  @ApiParam({
    name: 'groupId',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '更新後のメンバー情報を返却',
    type: Member,
  })
  update(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(
      +userId,
      +groupId,
      updateMemberDto,
    );
  }

  @Delete(':userId/:groupId')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体削除API' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: '1',
  })
  @ApiParam({
    name: 'groupId',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '削除後のメンバー情報を返却',
    type: Member,
  })
  remove(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.memberService.remove(
      +userId,
      +groupId,
    );
  }
}
