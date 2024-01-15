"use server";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { LoginButtonComponent } from "@components/button/login";
import { LogoutButtonComponent } from "@components/button/logout";
import { authOptions } from "@common/next-auth/options";

export const HeaderComponent = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <Navbar className="shadow">
      <NavbarBrand>
        <NavbarItem>
          <p className="font-bold text-inherit">
            <Link href="/">Next Keycloak</Link>
          </p>
        </NavbarItem>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {!user ? <LoginButtonComponent /> : <LogoutButtonComponent />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
