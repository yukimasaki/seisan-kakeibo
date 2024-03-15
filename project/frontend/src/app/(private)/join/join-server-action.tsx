"use server";

import { authOptions } from "@frontend/common/next-auth/options";
import { CreateMemberDto } from "@frontend/types/entities/member";
import { ServerActionResult } from "@frontend/types/server-actions";
import { getServerSession } from "next-auth";

export const joinGroup = async (
  prevState: {
    message: string | null;
  },
  formData: FormData,
): Promise<ServerActionResult> => {
  const session = await getServerSession(authOptions);
  const token = session?.user.accessToken;

  if (!session)
    return {
      isSubmitted: true,
      ok: false,
      message: "セッション取得エラー",
    };

  const userId = session?.profile.id;
  const groupId = formData.get("groupId") as string;
  const inviteToken = formData.get("inviteToken") as string;

  if (!groupId)
    return {
      isSubmitted: true,
      ok: false,
      message: "グループIDが不正です",
    };

  const createMemberDto: CreateMemberDto = {
    userId,
    groupId: parseInt(groupId),
  };

  console.log(createMemberDto);

  const createMemberResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/members`,
    {
      method: "POST",
      body: JSON.stringify(createMemberDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!createMemberResponse.ok) {
    if (createMemberResponse.status === 409) {
      return {
        isSubmitted: true,
        ok: false,
        message: "既にグループに参加済みです",
      };
    }
    return {
      isSubmitted: true,
      ok: false,
      message: "APIリクエストに失敗しました",
    };
  }

  // グループ参加後に、activeGroupIdを更新する
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      activeGroupId: parseInt(groupId),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // トークンをRedisから削除
  await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${inviteToken}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    isSubmitted: true,
    ok: true,
    message: "グループに参加しました",
  };
};
