export declare class Payment {
    id: number;
    payerId: number;
    finalBill: number;
    balance: number;
    difference: number;
    ratio: number | null;
    transactionId: number;
}
export declare class PaymentResponse extends Payment {
}
