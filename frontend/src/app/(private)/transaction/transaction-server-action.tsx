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
      userId: z.coerce.number(),
      finalBill: z.coerce.number(),
      balance: z.coerce.number(),
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

  const amount = formData.get("amount");
  const categoryId = formData.get("categoryId");
  const title = formData.get("title");
  const tag = formData.get("tag");
  const paymentDate = formData.get("paymentDate");
  const memo = formData.get("memo");
  const memberCount = formData.get("memberCount");
  const member = Array.from({ length: Number(memberCount) }, (_, idx) => ({
    userId: formData.get(`member.${idx}.userId`),
    finalBill: formData.get(`member.${idx}.finalBill`),
    balance: formData.get(`member.${idx}.balance`),
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

  console.log(createTransactionDto);

  try {
    CreateTransactionSchema.parse(createTransactionDto);
  } catch (error) {
    console.log(error);
  }

  return {
    isSubmitted: true,
    ok: true,
    message: "test",
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
