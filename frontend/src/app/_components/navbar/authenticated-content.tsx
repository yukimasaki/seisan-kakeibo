"use client";

import { LogoutButtonComponent } from "@components/button/logout";
import { NavMenu } from "@components/navbar/NavMenu";
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
      isMenuOpen={navMenu.isOpen}
      onMenuOpenChange={navMenu.toggle}
    >
      <NavbarContent justify="start">
        <NavMenu />
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
