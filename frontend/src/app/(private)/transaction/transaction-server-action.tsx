"use server";

import { authOptions } from "@common/next-auth/options";
import { ServerActionResult } from "@type/server-actions";
import {
  AmountBasis,
  Common,
  CreateTransactionDto,
  Even,
  Ratio,
} from "@type/transaction";
import { getServerSession } from "next-auth";
import React from "react";
import { ZodError, z } from "zod";

// **************************** スキーマ ****************************
// オブジェクト単位
const CommonSchema = z.object({
  amount: z.coerce.number({ invalid_type_error: "数値を入力してください" }), // formData
  categoryId: z.coerce.number({
    invalid_type_error: "カテゴリーを選択してください",
  }), // formData
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .min(1, { message: "1文字以上入力してください" })
    .max(128, { message: "128文字以内で入力してください" }), // formData
  creatorId: z.number(), // session
  paymentDate: z.date(), // formData
  memo: z.string().optional(), // formData
  status: z.string(),
  groupId: z.number(), // session
}) satisfies z.ZodType<Common>;

const RatioSchema = CommonSchema.extend({
  tag: z.enum(["ratio"]),
  member: z.array(
    z.object({
      userId: z.number(),
      finalBill: z.number(),
      ratio: z.number(),
    })
  ),
}) satisfies z.ZodType<Ratio>;

const EvenSchema = CommonSchema.extend({
  tag: z.enum(["even"]),
  member: z.array(
    z.object({
      userId: z.number(),
      finalBill: z.number(),
    })
  ),
}) satisfies z.ZodType<Even>;

const AmountBasisSchema = CommonSchema.extend({
  tag: z.enum(["amount_basis"]),
  member: z.array(
    z.object({
      userId: z.number(),
      finalBill: z.number(),
      specifiedAmount: z.number(),
    })
  ),
}) satisfies z.ZodType<AmountBasis>;

const CreateTransactionSchema = z.discriminatedUnion("tag", [
  RatioSchema,
  EvenSchema,
  AmountBasisSchema,
]) satisfies z.ZodType<CreateTransactionDto>;

// **************************** Server Actions ****************************
export const createTransaction = async (
  prevState: {
    message: string | null;
  },
  formData: FormData
): Promise<ServerActionResult<CreateTransactionDto>> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const creatorId = session?.profile?.id;
  const groupId = session?.activeGroup?.id;

  const amount = formData.get("amount");
  const categoryId = formData.get("categoryId");
  const title = formData.get("title");
  const tag = formData.get("tag");
  const paymentDate = formData.get("paymentDate");

  const memo = formData.get("memo");

  const createTransactionDto = {
    amount,
    categoryId,
    title,
    tag,
    creatorId,
    paymentDate,
    memo,
    groupId,
    // members,
  };

  return {
    isSubmitted: true,
    ok: true,
    message: "test",
    data: null,
  };
};

type RatioSchemaKeys = (typeof RatioSchema)["_type"];
type EvenSchemaKeys = (typeof EvenSchema)["_type"];
type AmountBasisSchemaKeys = (typeof AmountBasisSchema)["_type"];
export type Keys =
  | keyof RatioSchemaKeys
  | keyof EvenSchemaKeys
  | keyof AmountBasisSchemaKeys;

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
    tag: React.Key;
    key: Keys;
    value: unknown;
  }
): Promise<{ message: Map<Keys, string> }> => {
  const schema = (() => {
    switch (tag) {
      case "ratio": {
        const schema = RatioSchema.pick({ [key]: true });
        return schema;
      }
      case "even": {
        const schema = EvenSchema.pick({ [key]: true });
        return schema;
      }
      case "amount_basis": {
        const schema = AmountBasisSchema.pick({ [key]: true });
        return schema;
      }
    }
  })();

  if (!schema)
    return {
      message: messages,
    };

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