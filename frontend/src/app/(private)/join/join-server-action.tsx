"use server";

import { authOptions } from "@common/next-auth/options";
import { CreateMemberDto } from "@type/entities/member";
import { ServerActionResult } from "@type/server-actions";
import { getServerSession } from "next-auth";

export const joinGroup = async (
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

  const userId = session?.profile.id;
  const groupId = formData.get("groupId") as string;

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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/members`,
    {
      method: "POST",
      body: JSON.stringify(createMemberDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

  if (!response.ok)
    return {
      isSubmitted: true,
      ok: false,
      message: "APIリクエストに失敗しました",
    };

  return {
    isSubmitted: true,
    ok: true,
    message: "グループに参加しました",
  };
};
