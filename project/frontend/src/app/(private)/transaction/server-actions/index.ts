import { PaymentMethod } from "@entity/transaction.entity";

// todo: フォームからデータを取得する関数
export const extractFormData = (formData: FormData) => {
  const amount = Number(formData.get("amount"));
  const categoryId = Number(formData.get("categoryId"));
  const title = formData.get("title") as string;
  const method = formData.get("method") as PaymentMethod;
  const paymentDate = (() => {
    const paymentDate = formData.get("paymentDate")?.toString();
    if (!paymentDate) return new Date();
    return new Date(paymentDate);
  })();
  const memo = formData.get("memo") as string;

  const memberCount = Number(formData.get("memberCount"));
  const member = Array.from({ length: Number(memberCount) }, (_, idx) => ({
    userId: Number(formData.get(`member.${idx}.userId`)),
    finalBill: Number(formData.get(`member.${idx}.finalBill`)),
    balance: Number(formData.get(`member.${idx}.balance`)),
  }));

  return {
    amount,
    categoryId,
    title,
    method,
    paymentDate,
    memo,
    member,
  };
};

// todo: バリデーションを行う関数
// todo: バリデーション後のデータを作成する関数
