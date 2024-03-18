import { CreateTransactionComplex } from "@dto/create-transaction.dto";
import { PaymentMethod } from "@entity/transaction.entity";
import { ServerActionResult } from "@frontend/types/server-actions";
import { z } from "zod";

// フォームからデータを取得する関数
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

// バリデーションを行う関数
const isTypeValid = (unvalidatedData: CreateTransactionComplex): boolean => {
  const CreateTransactionComplexSchema = z.object({
    amount: z.number({ required_error: "数値を入力してください" }), // formData
    categoryId: z.number({
      required_error: "カテゴリーを選択してください",
    }), // formData
    title: z
      .string({ required_error: "タイトルを入力してください" })
      .min(1, { message: "1文字以上入力してください" })
      .max(128, { message: "128文字以内で入力してください" }), // formData
    method: z.union([
      z.literal("RATIO"),
      z.literal("EVEN"),
      z.literal("AMOUNT_BASIS"),
    ]) satisfies z.ZodType<PaymentMethod>,
    paymentDate: z.coerce.date(), // formData
    memo: z.string().optional(), // formData
    member: z.array(
      z.object({
        userId: z.number(),
        finalBill: z.number(),
        balance: z.number(),
      }),
    ),
    creatorId: z.coerce.number(), // session
    groupId: z.coerce.number(), // session
    status: z.string(),
  });

  const createTransactionComplex =
    CreateTransactionComplexSchema.safeParse(unvalidatedData);

  if (!createTransactionComplex.success) false;
  return true;
};

const isTotalFinalBillsEqualToAmount = (
  unvalidateData: CreateTransactionComplex,
): boolean => {
  const totalAmount: number = unvalidateData.amount;
  const dividedTotal: number = unvalidateData.member.reduce(
    (acc, data) => acc + data.finalBill,
    0,
  );

  if (totalAmount !== dividedTotal) return false;
  return true;
};

const isTotalBalancesEqualToAmount = (
  unvalidateData: CreateTransactionComplex,
): boolean => {
  const totalAmount: number = unvalidateData.amount;
  const dividedTotal: number = unvalidateData.member.reduce(
    (acc, data) => acc + data.balance,
    0,
  );

  if (totalAmount !== dividedTotal) return false;
  return true;
};

const isTotalRatiosEqualToOne = (
  unvalidateData: CreateTransactionComplex,
): boolean => {
  const totalRatios: number = unvalidateData.member.reduce((acc, data) => {
    if (data.ratio === null || data.ratio === undefined) return 0;
    return acc + data.ratio;
  }, 0);

  if (totalRatios !== 1) return false;
  return true;
};

const isCreatorFullyPaying = (unvalidateData: CreateTransactionComplex) => {
  const creatorId: number = unvalidateData.creatorId;
  const totalAmount: number = unvalidateData.amount;
  const creator = unvalidateData.member.find(
    (data) => data.userId === creatorId,
  );
  if (!creator) return false;
  const creatorFinalBill: number = creator.finalBill;
  const creatorBalance: number = creator.balance;
  const creatorRatio: number = creator.ratio ?? 0;

  if (
    // 作成者の比率が1と等しくない場合は例外をスロー
    creatorRatio !== 1 ||
    // 作成者の支払額と規定額が等しいこと
    creatorFinalBill !== creatorBalance ||
    // 作成者の支払額と総額が等しいこと
    creatorFinalBill !== totalAmount
  )
    return false;
  // すべてのバリデーションに通過したらtrueを返却
  return true;
};

export const validate = (
  unvalidatedData: CreateTransactionComplex,
): ServerActionResult | CreateTransactionComplex => {
  // 型のバリデーション
  if (!isTypeValid(unvalidatedData))
    return {
      isSubmitted: true,
      ok: false,
      message: "入力したデータの型に誤りがあります",
    };

  // 一人当たりの金額の合計と総額が一致するかのバリデーション
  if (!isTotalFinalBillsEqualToAmount(unvalidatedData))
    return {
      isSubmitted: true,
      ok: false,
      message: "一人当たりの金額の合計と総額が一致しません (finalBill)",
    };
  if (!isTotalBalancesEqualToAmount(unvalidatedData))
    return {
      isSubmitted: true,
      ok: false,
      message: "一人当たりの金額の合計と総額が一致しません (balance)",
    };

  // 一人当たりの比率の合計が1と等しいかのバリデーション
  if (unvalidatedData.method === "RATIO") {
    if (!isTotalRatiosEqualToOne(unvalidatedData))
      return {
        isSubmitted: true,
        ok: false,
        message: "一人当たりの比率の合計が1ではありません",
      };
  }

  // 作成者が全額負担しているかのバリデーション
  if (
    unvalidatedData.member.length === 1 ||
    unvalidatedData.method === "NONE"
  ) {
    if (!isCreatorFullyPaying(unvalidatedData))
      return {
        isSubmitted: true,
        ok: false,
        message: "作成者の負担額と総額が一致しません",
      };
  }

  // すべてのバリデーションに通過した場合はAPIに渡すためのデータを返す
  const createTransactionComplex: CreateTransactionComplex = {
    ...unvalidatedData,
  };
  return createTransactionComplex;
};

// todo: バリデーション後のデータを作成する関数
