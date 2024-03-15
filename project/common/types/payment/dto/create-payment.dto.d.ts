import { Payment } from "../entities/payment.entity";
declare const CreatePaymentDto_base: import("@nestjs/common").Type<Omit<Payment, "id">>;
export declare class CreatePaymentDto extends CreatePaymentDto_base {
}
declare const CreatePaymentOmitTransactionId_base: import("@nestjs/common").Type<Omit<Payment, "id" | "transactionId">>;
export declare class CreatePaymentOmitTransactionId extends CreatePaymentOmitTransactionId_base {
}
export {};
