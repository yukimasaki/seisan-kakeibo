import { Transaction } from "../entities/transaction.entity";
import { OmitType } from "@nestjs/swagger";

export class CreateTransactionFormData extends OmitType(Transaction, ['id', 'editorId']) {
  method: string;
  paymentInfoArray: {
    userId: number;
    ratio: number;
    amountEachMember: number;
  }[];
}

export class CreateTransactionDto extends OmitType(Transaction, ['id', 'editorId']) { }
