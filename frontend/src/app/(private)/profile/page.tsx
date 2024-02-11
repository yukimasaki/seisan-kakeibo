"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@common/next-auth/options";
import { User } from "@type/entities/user";
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

  const data: User = await response.json();
  const user: User = {
    ...data,
    uuid: data.uuid || session?.user.id || "",
    email: data.email || session?.user.email || "",
  };

  return (
    <>
      <NavbarComponent />
      <ProfileFormComponent user={user} />
    </>
  );
};

export default ProfilePage;
