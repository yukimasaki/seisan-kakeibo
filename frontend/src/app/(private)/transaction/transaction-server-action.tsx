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
  creatorId: z.number(), // session
  amount: z.number(), // formData
  paymentDate: z.date(), // formData
  title: z.string(), // formData
  memo: z.string().optional(), // formData
  status: z.string(),
  categoryId: z.number(), // formData
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

  const tag = formData.get("tag");
  const amount = formData.get("amount");
  const paymentDate = formData.get("paymentDate");
  const title = formData.get("title");
  const memo = formData.get("memo");
  const categoryId = formData.get("categoryId");

  // const createTransactionDto: CreateTransactionDto = {
  //   tag,
  //   creatorId,
  //   amount,
  //   paymentDate,
  //   title,
  //   memo,
  //   categoryId,
  //   groupId,
  //   // members,
  // };

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
export const validateOnBlur = ({
  tag,
  key,
  value,
}: {
  tag: React.Key;
  key:
    | keyof RatioSchemaKeys
    | keyof EvenSchemaKeys
    | keyof AmountBasisSchemaKeys;
  value: unknown;
}): {
  message: string | null;
} => {
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
      message: null,
    };

  try {
    schema.parse({ [key]: value });
    return {
      message: null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return {
        message: error.errors[0].message,
      };
    } else {
      return {
        message: null,
      };
    }
  }
};
