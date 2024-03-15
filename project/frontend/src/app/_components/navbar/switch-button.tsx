"use server";

import { authOptions } from "@frontend/common/next-auth/options";
import { LoginButtonComponent } from "@frontend/components/button/login";
import { LogoutButtonComponent } from "@frontend/components/button/logout";
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
