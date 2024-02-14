"use server";

import { authOptions } from "@common/next-auth/options";
import { ServerActionResult } from "@type/server-actions";
import { CommonInput, CreateTransactionDto } from "@type/entities/transaction";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

// **************************** スキーマ ****************************
export type PaymentType = "ratio" | "even" | "amount_basis";

// オブジェクト単位
const CommonInputSchema = z.object({
  amount: z.number({ required_error: "数値を入力してください" }), // formData
  categoryId: z.number({
    required_error: "カテゴリーを選択してください",
  }), // formData
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .min(1, { message: "1文字以上入力してください" })
    .max(128, { message: "128文字以内で入力してください" }), // formData
  creatorId: z.coerce.number(), // session
  paymentDate: z.coerce.date(), // formData
  memo: z.string().optional(), // formData
  status: z.string(),
  groupId: z.coerce.number(), // session
}) satisfies z.ZodType<CommonInput>;

const CreateTransactionSchema = CommonInputSchema.extend({
  member: z.array(
    z.object({
      userId: z.number(),
      finalBill: z.number(),
      balance: z.number(),
    })
  ),
}) satisfies z.ZodType<CreateTransactionDto>;

// **************************** Server Actions ****************************
export const createTransaction = async (
  prevState: {
    message: string | null;
  },
  formData: FormData
): Promise<ServerActionResult> => {
  const session = await getServerSession(authOptions);

  const creatorId = session?.profile?.id;
  const groupId = session?.profile.activeGroup?.id;
  const status = "未精算";

  const amount = Number(formData.get("amount"));
  const categoryId = Number(formData.get("categoryId"));
  const title = formData.get("title");
  const tag = formData.get("tag") as PaymentType;
  const paymentDate = (() => {
    const paymentDate = formData.get("paymentDate")?.toString();
    if (!paymentDate) return new Date();
    return new Date(paymentDate);
  })();
  const memo = formData.get("memo");
  const memberCount = formData.get("memberCount");
  const member = Array.from({ length: Number(memberCount) }, (_, idx) => ({
    userId: Number(formData.get(`member.${idx}.userId`)),
    finalBill: Number(formData.get(`member.${idx}.finalBill`)),
    balance: Number(formData.get(`member.${idx}.balance`)),
  }));

  const createTransactionDto = {
    creatorId,
    groupId,
    status,
    amount,
    categoryId,
    title,
    tag,
    paymentDate,
    memo,
    member,
  };

  // 1. 入力値が型として正しいかどうかのバリデーション
  try {
    CreateTransactionSchema.parse(createTransactionDto);
  } catch (error) {
    // console.log(error);
    return {
      isSubmitted: true,
      ok: false,
      message: "入力内容に誤りがあります",
    };
  }

  // 2. 支払い情報が不釣り合いではないかのバリデーション
  const initialValue = 0;
  const totalFinalBill = member.reduce(
    (accumulator, currentValue) => accumulator + currentValue.finalBill,
    initialValue
  );

  if (totalFinalBill !== amount) {
    // console.log("amountとtotalFinalBillが一致していません");
    return {
      isSubmitted: true,
      ok: false,
      message: "amountとtotalFinalBillが一致していません",
    };
  }

  const totalBalance = member.reduce(
    (accumulator, currentValue) => accumulator + currentValue.balance,
    initialValue
  );
  if (tag === "ratio") {
    if (totalBalance !== 100) {
      // console.log("ratioの合計が100%ではありません");
      return {
        isSubmitted: true,
        ok: false,
        message: "ratioの合計が100%ではありません",
      };
    }
  } else {
    if (totalBalance !== amount) {
      // console.log("amountとtotalBalanceが一致していません");
      return {
        isSubmitted: true,
        ok: false,
        message: "amountとtotalBalanceが一致していません",
      };
    }
  }

  // 3. すべてのバリデーションに通過した場合、成功のメッセージを返す
  return {
    isSubmitted: true,
    ok: true,
    message: "保存しました",
  };
};

export type Keys = keyof (typeof CreateTransactionSchema)["_type"];

const messages = new Map<Keys, string>();

export const clearMessages = () => {
  messages.clear();
};

export const validateOnBlur = async (
  prevState: {
    message: Map<Keys, string>;
  },
  {
    tag,
    key,
    value,
  }: {
    tag: PaymentType;
    key: Keys;
    value: unknown;
  }
): Promise<{ message: Map<Keys, string> }> => {
  const schema = CreateTransactionSchema.pick({ [key]: true });

  try {
    schema.parse({ [key]: value });
    // reason: エラーメッセージがフォームに表示され続けてしまうため、バリデーションを通過したkeyをmessagesから削除する
    messages.delete(key);
    return {
      message: messages,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      messages.set(key, error.errors[0].message);
      return {
        message: messages,
      };
    } else {
      return {
        message: messages,
      };
    }
  }
};
