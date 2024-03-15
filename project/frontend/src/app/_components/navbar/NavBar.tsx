"use server";

import { authOptions } from "@frontend/common/next-auth/options";
import { NavBarAuthenticatedContentComponent } from "@frontend/components/navbar/authenticated-content";
import { NavBarUnauthenticatedContentComponent } from "@frontend/components/navbar/unauthenticated-content";
import { getServerSession } from "next-auth";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const content = (() => {
    if (!session?.user) {
      return <NavBarUnauthenticatedContentComponent />;
    } else {
      return <NavBarAuthenticatedContentComponent />;
    }
  })();
  return content;
};
