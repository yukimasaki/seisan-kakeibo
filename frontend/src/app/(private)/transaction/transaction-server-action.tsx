"use server";

import {
  AmountBasis,
  Common,
  CreateTransactionDto,
  Even,
  Ratio,
} from "@type/transaction";
import { z } from "zod";

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
