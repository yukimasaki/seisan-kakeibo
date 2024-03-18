import { CreateTransactionComplex } from "@dto/create-transaction.dto";

const formDataMock = new FormData();
const fields: (keyof CreateTransactionComplex)[] = ["hoge"];

console.log(fields);
