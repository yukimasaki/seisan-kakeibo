"use server";

import { authOptions } from "@common/next-auth/options";
import { ServerActionResult } from "@type/server-actions";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

const CreateGroupSchema = z.object({
  displayName: z.string().min(1, { message: "1文字以上入力してください" }).max(255, "255文字以内で入力してください"),
});

const DisplayNameSchema = CreateGroupSchema.pick({
  displayName: true,
});

export const createGroup = async (
  prevState: {
    message: string | null,
  },
  formData: FormData,
): Promise<ServerActionResult> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const displayName = formData.get("displayName");

  const group = {
    displayName,
  };

  try {
    CreateGroupSchema.parse(group);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, {
      method: "POST",
      body: JSON.stringify(group),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  } catch (error) {
    const result: ServerActionResult = {
      ok: false,
      message: `入力内容に誤りがあります`,
    }
    return result;
  }

  // 成功時
  const result: ServerActionResult = {
    ok: true,
    message: "グループを作成しました"
  };
  return result;
};

export const validateOnBlurDisplayName = async (
  prevState: {
    message: string | null,
  },
  value: string,
) => {
  try {
    DisplayNameSchema.parse({
      displayName: value,
    });
    return {
      message: null,
    };
  } catch (error) {
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
