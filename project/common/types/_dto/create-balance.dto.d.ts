import { Balance } from '@entity/balance.entity';
declare const CreateBalanceDto_base: import("@nestjs/common").Type<Omit<Balance, "id">>;
export declare class CreateBalanceDto extends CreateBalanceDto_base {
}
declare const CreateBalanceOmitTransactionId_base: import("@nestjs/common").Type<Omit<Balance, "id" | "transactionId">>;
export declare class CreateBalanceOmitTransactionId extends CreateBalanceOmitTransactionId_base {
}
export {};
