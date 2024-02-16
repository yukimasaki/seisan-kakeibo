import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { Category } from './entities/category.entity';
import { UtilityService } from '@@nest/common/services/utility.service';

@Controller('categories')
@ApiTags('/categories')
@SummarizeApiResponse()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly utilityService: UtilityService,
  ) {}

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
  @ApiOperation({ summary: 'グループ取得API' })
  @ApiResponse({
    status: 200,
    description: '自分の所属するグループのカテゴリー情報を返却',
    type: Category,
  })
  findByMyGroupId(@Request() req) {
    const authorizationHeader: string = req.headers.authorization;
    if (!authorizationHeader) throw new BadRequestException();

    const bearerToken: string =
      this.utilityService.getBearerToken(authorizationHeader);
    return this.categoryService.findByMyGroupId(bearerToken);
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
