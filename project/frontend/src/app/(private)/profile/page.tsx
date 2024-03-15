"use server";

import { NavBar } from "@components/navbar/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@common/next-auth/options";
import { UserResponse } from "@type/entities/user";
import { ProfileFormComponent } from "./profile-form";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  // ユーザー名をDBから取得
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const data: UserResponse = await response.json();
  const user: UserResponse = {
    ...data,
    uuid: data.uuid || session?.user.id || "",
    email: data.email || session?.user.email || "",
  };

  return (
    <>
      <NavBar />
      <ProfileFormComponent user={user} />
    </>
  );
};

export default ProfilePage;
