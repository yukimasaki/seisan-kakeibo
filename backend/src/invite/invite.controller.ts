import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SummarizeApiResponse } from '@decorators/summarize-api-response.decorator';
import { InviteResponse } from './entities/invite.entity';

@Controller('invites')
@ApiTags('/invites')
@SummarizeApiResponse()
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'メンバー招待情報生成API' })
  @ApiResponse({
    status: 201,
    description: '生成したトークンを返却',
    type: InviteResponse,
  })
  create(@Body() createInviteDto: CreateInviteDto) {
    return this.inviteService.create(createInviteDto);
  }

  @Get(':token')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'グループID取得API' })
  @ApiResponse({
    status: 201,
    description: '指定したトークンに対応するグループIDを返却',
    type: InviteResponse,
  })
  findOne(@Param('token') token: string) {
    return this.inviteService.findOne(token);
  }

  @Delete(':token')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'メンバー招待情報削除API' })
  @ApiResponse({
    status: 201,
    description: '削除後のメンバー招待情報を返却',
    type: InviteResponse,
  })
  remove(@Param('token') token: string) {
    return this.inviteService.remove(token);
  }
}
