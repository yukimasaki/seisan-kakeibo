import { Transaction } from '../entities/transaction.entity';
declare const CreateTransactionDto_base: import("@nestjs/common").Type<Omit<Transaction, "id" | "editorId">>;
export declare class CreateTransactionDto extends CreateTransactionDto_base {
}
declare class Member {
    userId: number;
    finalBill: number;
    ratio: number | null;
    balance: number;
}
export declare class BalanceInput {
    member: Member[];
}
declare const CreateTransactionComplex_base: import("@nestjs/common").Type<CreateTransactionDto & BalanceInput>;
export declare class CreateTransactionComplex extends CreateTransactionComplex_base {
}
export {};
