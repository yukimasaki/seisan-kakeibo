export type PaymentStatus = 'PENDING' | 'PROPOSED' | 'COMPLETED';
export type PaymentMethod = 'RATIO' | 'EVEN' | 'AMOUNT_BASIS' | 'NONE';
export declare class Transaction {
    id: number;
    creatorId: number;
    editorId: number;
    amount: number;
    paymentDate: Date;
    title: string;
    memo: string;
    status: PaymentStatus;
    method: PaymentMethod;
    categoryId: number;
    groupId: number;
}
export declare class TransactionResponse extends Transaction {
}
