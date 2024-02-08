"use client";

import { LogoutButtonComponent } from "@components/button/logout";
import { NavMenuComponent } from "@components/navbar/navmenu";
import { useNavMenu } from "@hooks/useToggle";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export const NavBarAuthenticatedContentComponent = () => {
  const navMenu = useNavMenu();

  return (
    <Navbar
      className="shadow"
      maxWidth="full"
      onMenuOpenChange={navMenu.onClose}
    >
      <NavbarContent justify="start">
        <NavMenuComponent />
        <NavbarBrand>
          <NavbarItem>
            <p className="font-bold text-inherit">
              <Link href="/transaction">Seisan家計簿</Link>
            </p>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LogoutButtonComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
