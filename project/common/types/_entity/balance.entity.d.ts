import { PaymentStatus } from './transaction.entity';
export declare class Balance {
    id: number;
    lenderId: number;
    borrowerId: number;
    amount: number;
    status: PaymentStatus;
    transactionId: number;
}
export declare class BalanceResponse extends Balance {
}
