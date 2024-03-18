export declare class Payment {
    id: number;
    payerId: number;
    finalBill: number;
    balance: number;
    difference: number;
    ratio?: number;
    transactionId: number;
}
export declare class PaymentResponse extends Payment {
}
