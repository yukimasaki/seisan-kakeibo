"use server";

import { authOptions } from "@frontend/common/next-auth/options";
import { ServerActionResult } from "@frontend/types/server-actions";
import {
  CreateTransactionComplex,
  CreateTransactionDto,
} from "@dto/create-transaction.dto";
import { PaymentMethod } from "@entity/transaction.entity";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

// **************************** スキーマ ****************************
// オブジェクト単位
const CreateTransactionDtoSchema = z.object({
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
}) satisfies z.ZodType<CreateTransactionDto>;

const CreateTransactionSchema = CreateTransactionDtoSchema.extend({
  method: z.union([
    z.literal("RATIO"),
    z.literal("EVEN"),
    z.literal("AMOUNT_BASIS"),
  ]) satisfies z.ZodType<PaymentMethod>,
  member: z.array(
    z.object({
      userId: z.number(),
      finalBill: z.number(),
      balance: z.number(),
    }),
  ),
}) satisfies z.ZodType<CreateTransactionComplex>;

// **************************** Server Actions ****************************
// todo: フォームからデータを取得する関数
const extractFormData = <T,>(
  formData: FormData,
  fields: (keyof T)[],
): Partial<T> => {
  const result: Partial<T> = {};
  fields.forEach((field) => {
    const value = formData.get(field as string);
    if (value !== null) {
      result[field] = value as any;
    }
  });
  return result;
};

// todo: バリデーション前のデータを作成する関数
// todo: バリデーションを行う関数
// todo: バリデーション後のデータを作成する関数

export const createTransaction = async (
  prevState: {
    message: string | null;
  },
  formData: FormData,
): Promise<ServerActionResult> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const creatorId = session?.profile?.id;
  const groupId = session?.profile.activeGroup?.id;
  const status = "未精算";

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
  const memberCount = formData.get("memberCount");
  const member = Array.from({ length: Number(memberCount) }, (_, idx) => ({
    userId: Number(formData.get(`member.${idx}.userId`)),
    finalBill: Number(formData.get(`member.${idx}.finalBill`)),
    balance: Number(formData.get(`member.${idx}.balance`)),
  }));

  const preValidateData: Partial<CreateTransactionComplex> = {
    creatorId,
    groupId,
    status,
    amount,
    categoryId,
    title,
    method,
    paymentDate,
    memo,
    member,
  };

  // 1. 入力値が型として正しいかどうかのバリデーション
  const createTransactionComplex =
    CreateTransactionSchema.safeParse(preValidateData);
  if (!createTransactionComplex.success)
    return {
      isSubmitted: true,
      ok: false,
      message: "入力内容に誤りがあります",
    };

  // 2. 支払い情報が不釣り合いではないかのバリデーション
  const initialValue = 0;
  const totalFinalBill = member.reduce(
    (accumulator, currentValue) => accumulator + currentValue.finalBill,
    initialValue,
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
    initialValue,
  );
  if (method === "RATIO") {
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

  // 3. すべてのバリデーションに通過した場合、APIへPOSTリクエストを送信する
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
    {
      method: "POST",
      body: JSON.stringify(
        createTransactionComplex.data satisfies CreateTransactionComplex,
      ),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok)
    return {
      isSubmitted: true,
      ok: false,
      message: "APIリクエストに失敗しました",
    };

  // 成功のメッセージを返す
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
    method,
    key,
    value,
  }: {
    method: PaymentMethod;
    key: Keys;
    value: unknown;
  },
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
