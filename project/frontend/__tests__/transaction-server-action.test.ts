import { CreateTransactionComplex, Member } from "@dto/create-transaction.dto";
import { PaymentMethod, PaymentStatus } from "@entity/transaction.entity";
import { extractFormData } from "../src/app/(private)/transaction/server-actions";

const createMock = (
  overrides?: Partial<CreateTransactionComplex>,
): FormData => {
  const formData: FormData = new FormData();

  const testCreateTransactionComplex: CreateTransactionComplex & {
    memberCount: number;
  } = {
    memberCount: 2,

    creatorId: 1,
    groupId: 1,
    status: "PENDING",
    method: "RATIO",
    amount: 1000,
    categoryId: 1,
    title: "テスト",
    paymentDate: new Date("2024-01-01"),
    memo: "テスト",
    member: [
      {
        userId: 1,
        finalBill: 1000,
        balance: 0.5,
      },
      {
        userId: 2,
        finalBill: 0,
        balance: 0.5,
      },
    ],
    ...overrides,
  };

  formData.append(
    "memberCount",
    testCreateTransactionComplex.memberCount.toString(),
  );

  formData.append("method", testCreateTransactionComplex.method.toString());
  formData.append("amount", testCreateTransactionComplex.amount.toString());
  formData.append(
    "categoryId",
    testCreateTransactionComplex.categoryId.toString(),
  );
  formData.append("title", testCreateTransactionComplex.title.toString());
  formData.append(
    "paymentDate",
    testCreateTransactionComplex.paymentDate.toString(),
  );
  formData.append("memo", testCreateTransactionComplex.memo.toString());
  testCreateTransactionComplex.member.forEach((member, index) => {
    Object.entries(member).forEach(([key, value]) => {
      const formKey = `member.${index.toString()}.${key}`;
      const formValue = value.toString();
      formData.append(formKey, formValue);
    });
  });

  return formData;
};

describe("extractFormData", () => {
  test("フォームに入力したデータオブジェクト形式で返ってくること", () => {
    const formDataMock = createMock({ categoryId: 2 });
    const formValues = extractFormData(formDataMock);
    expect(formValues).toEqual({
      amount: 1000,
      categoryId: 2,
      title: "テスト",
      method: "RATIO",
      paymentDate: expect.any(Date),
      memo: "テスト",
      member: [
        {
          userId: 1,
          finalBill: 1000,
          balance: 0.5,
        },
        {
          userId: 2,
          finalBill: 0,
          balance: 0.5,
        },
      ],
    });
  });

  test.todo("index.ts > validate関数のテスト");
});
