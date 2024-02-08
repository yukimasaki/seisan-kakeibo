"use client";

import { LoginButtonComponent } from "@components/button/login";
import { useNavMenu } from "@hooks/useToggle";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export const NavBarUnauthenticatedContentComponent = () => {
  const navMenu = useNavMenu();

  return (
    <Navbar
      className="shadow"
      maxWidth="full"
      onMenuOpenChange={navMenu.onClose}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <NavbarItem>
            <p className="font-bold text-inherit">
              <Link href="/">Seisan家計簿</Link>
            </p>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LoginButtonComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
