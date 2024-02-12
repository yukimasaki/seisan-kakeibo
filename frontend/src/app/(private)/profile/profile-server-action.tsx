"use server";

import { authOptions } from "@common/next-auth/options";
import { UserResponse } from "@type/entities/user";
import { ServerActionResult } from "@type/server-actions";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

const UpsertProfileSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email({ message: "メールアドレスを入力してください" }),
  userName: z
    .string()
    .min(1, { message: "1文字以上入力してください" })
    .max(255, { message: "255文字以内で入力してください" }),
});

const EmailSchema = UpsertProfileSchema.pick({
  email: true,
});

const UserNameSchema = UpsertProfileSchema.pick({
  userName: true,
});

export const upsertProfile = async (
  prevState: {
    message: string | null;
  },
  formData: FormData
): Promise<ServerActionResult<UserResponse>> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const uuid = formData.get("uuid");
  const email = formData.get("email");
  const userName = formData.get("userName");

  const createProfileDto = {
    uuid,
    email,
    userName,
  };

  try {
    UpsertProfileSchema.parse(createProfileDto);
  } catch (error) {
    const result: ServerActionResult<UserResponse> = {
      isSubmitted: true,
      ok: false,
      message: `入力内容に誤りがあります`,
      data: null,
    };
    return result;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    {
      method: "POST",
      body: JSON.stringify(createProfileDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const profileResponse: UserResponse = await response.json();
  // console.log(profileResponse);

  const result: ServerActionResult<UserResponse> = {
    isSubmitted: true,
    ok: true,
    message: "プロフィールを保存しました",
    data: profileResponse,
  };
  return result;
};

export const validateOnBlurEmail = async (
  prevState: {
    message: string | null;
  },
  value: string
) => {
  try {
    EmailSchema.parse({
      email: value,
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

export const validateOnBlurUserName = async (
  prevState: {
    message: string | null;
  },
  value: string
) => {
  try {
    UserNameSchema.parse({
      userName: value,
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
