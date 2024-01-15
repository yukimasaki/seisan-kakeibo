import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionFormData } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import * as dayjs from 'dayjs';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SummarizeApiResponse } from '@@nest/common/decorators/summarize-api-response.decorator';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
@ApiTags('/transactions')
@SummarizeApiResponse()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録後の取引情報を返却',
    type: Transaction,
  })
  createWithTransaction(
    @Body() createTransactionFormData: CreateTransactionFormData,
  ) {
    return this.transactionService.createWithTransaction(createTransactionFormData);
  }

  // @Get()
  // findAll() {
  //   return this.transactionService.findAll();
  // }

  @Get()
  findByPaymentDate(
    @Query('start') start: string = dayjs().startOf('month').format('YYYY-MM-DD'),
    @Query('end') end: string = dayjs().endOf('month').format('YYYY-MM-DD'),
  ) {
    return this.transactionService.findByPaymentDate(
      start,
      end,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
