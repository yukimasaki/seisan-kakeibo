import { CreateTransactionComplex, Member } from "@dto/create-transaction.dto";
import { PaymentMethod, PaymentStatus } from "@entity/transaction.entity";
import { extractFormData } from "../src/app/(private)/transaction/server-actions";

const creatorId: number = 1;
const groupId: number = 1;
const status: PaymentStatus = "PENDING";

const createMock = (): FormData => {
  const formData: FormData = new FormData();

  const method: PaymentMethod = "RATIO";
  const amount: number = 1000;
  const categoryId: number = 1;
  const title: string = "テスト";
  const paymentDate: Date = new Date("2024-01-01");
  const memo: string = "テスト";

  const memberCount: number = 2;
  const members: Member[] = [
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
  ];

  formData.append("method", method.toString());
  formData.append("amount", amount.toString());
  formData.append("categoryId", categoryId.toString());
  formData.append("title", title.toString());
  formData.append("paymentDate", paymentDate.toString());
  formData.append("memo", memo.toString());
  formData.append("memberCount", memberCount.toString());
  members.forEach((member, index) => {
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
    const formDataMock = createMock();
    const formValues = extractFormData(formDataMock);
    expect(formValues).toEqual({
      amount: 1000,
      categoryId: 1,
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
});
