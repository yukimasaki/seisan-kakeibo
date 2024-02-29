"use server";

import { authOptions } from "@common/next-auth/options";
import { CreateGroupAndMemberDto, GroupResponse } from "@type/entities/group";
import { CreateInviteDto, InviteResponse } from "@type/entities/invite";
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
): Promise<ServerActionResult> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!session)
    return {
      isSubmitted: true,
      ok: false,
      message: "セッション取得エラー",
    };

  const displayName = formData.get("displayName")?.toString() || "";

  const profileResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user: UserResponse = await profileResponse.json();

  const createGroupAndMemberDto: CreateGroupAndMemberDto = {
    creatorId: session?.profile.id,
    displayName,
    userId: user.id,
  };

  try {
    CreateGroupSchema.parse(createGroupAndMemberDto);
  } catch (error) {
    console.log(error);

    const result: ServerActionResult = {
      isSubmitted: true,
      ok: false,
      message: `入力内容に誤りがあります`,
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

  // グループ作成後に、activeGroupIdを更新する
  const updateProfileResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        activeGroupId: parsedGroupResponse.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result: ServerActionResult = {
    isSubmitted: true,
    ok: true,
    message: "グループを作成しました",
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

export const inviteGroup = async (groupId: number): Promise<InviteResponse> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites`,
    {
      method: "POST",
      body: JSON.stringify({
        groupId,
      } satisfies CreateInviteDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const inviteToken = await response.json();
  return inviteToken;
};
