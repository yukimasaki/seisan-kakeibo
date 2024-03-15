import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SummarizeApiResponse } from '@decorators/summarize-api-response.decorator';
import { Balance } from './entities/balance.entity';

@Controller('balances')
@ApiTags('/balances')
@SummarizeApiResponse()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みの貸借情報を全数返却',
    type: Balance,
  })
  findAll() {
    return this.balanceService.findAll();
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したIDの貸借情報を返却',
    type: Balance,
  })
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(+id);
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
    description: '更新後の貸借情報を返却',
    type: Balance,
  })
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.update(+id, updateBalanceDto);
  }
}
