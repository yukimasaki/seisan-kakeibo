"use server";

import { authOptions } from "@common/next-auth/options";
import { LoginButtonComponent } from "@components/button/login";
import { LogoutButtonComponent } from "@components/button/logout";
import { getServerSession } from "next-auth";

export const SwitchButton = async () => {
  const session = await getServerSession(authOptions);
  const button = (() => {
    if (session?.user) {
      return <LogoutButtonComponent />;
    } else {
      return <LoginButtonComponent />;
    }
  })();
  return button;
};
