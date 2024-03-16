import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupAndMemberDto } from '@dto/create-group.dto';
import { UpdateGroupDto } from '@dto/update-group.dto';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Group } from '@entity/group.entity';
import { SummarizeApiResponse } from '@backend/decorators/summarize-api-response.decorator';

@Controller('groups')
@ApiTags('/groups')
@SummarizeApiResponse()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録後のグループ情報を返却する',
    type: Group,
  })
  create(@Body() createGroupAndMemberDto: CreateGroupAndMemberDto) {
    return this.groupService.create(createGroupAndMemberDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みグループ情報を全数返却',
    type: Group,
  })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API (ID)' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのグループ情報を返却',
    type: Group,
  })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
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
    description: '更新後のグループ情報を返却',
    type: Group,
  })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
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
    description: '削除後のグループ情報を返却',
    type: Group,
  })
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
