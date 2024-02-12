"use server";

import { authOptions } from "@common/next-auth/options";
import { GroupResponse } from "@type/entities/group";
import { UserResponse } from "@type/entities/user";
import { ServerActionResult } from "@type/server-actions";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

const CreateGroupSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "1文字以上入力してください" })
    .max(255, "255文字以内で入力してください"),
});

const DisplayNameSchema = CreateGroupSchema.pick({
  displayName: true,
});

export const createGroup = async (
  prevState: {
    message: string | null;
  },
  formData: FormData
): Promise<ServerActionResult<GroupResponse>> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const displayName = formData.get("displayName");

  const profileResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const user: UserResponse = await profileResponse.json();

  const createGroupAndMemberDto = {
    displayName,
    userId: user.id,
  };

  try {
    CreateGroupSchema.parse(createGroupAndMemberDto);
  } catch (error) {
    console.log(error);

    const result: ServerActionResult<GroupResponse> = {
      isSubmitted: true,
      ok: false,
      message: `入力内容に誤りがあります`,
      data: null,
    };
    return result;
  }
  const groupResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`,
    {
      method: "POST",
      body: JSON.stringify(createGroupAndMemberDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const parsedGroupResponse: GroupResponse = await groupResponse.json();

  const result: ServerActionResult<GroupResponse> = {
    isSubmitted: true,
    ok: true,
    message: "グループを作成しました",
    data: parsedGroupResponse,
  };
  return result;
};

export const validateOnBlurDisplayName = async (
  prevState: {
    message: string | null;
  },
  value: string
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
