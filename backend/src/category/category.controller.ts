import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('/categories')
@SummarizeApiResponse()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録後のカテゴリー情報を返却',
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'グループ別カテゴリー取得API' })
  @ApiQuery({
    name: 'groupId',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたグループIDのカテゴリー情報を返却',
    type: Category,
  })
  findByGroupId(@Query('groupId') groupId: string) {
    if (!groupId || Number.isNaN(parseInt(groupId)))
      throw new BadRequestException();
    return this.categoryService.findByGroupId(+groupId);
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体取得API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのカテゴリー情報を返却',
    type: Category,
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
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
    description: '更新後のカテゴリー情報を返却',
    type: Category,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
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
    description: '削除後のカテゴリー情報を返却',
    type: Category,
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
