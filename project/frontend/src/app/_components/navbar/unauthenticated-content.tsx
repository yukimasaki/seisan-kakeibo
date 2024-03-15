"use client";

import { LoginButtonComponent } from "@frontend/components/button/login";
import { useNavMenu } from "@frontend/hooks/useToggle";
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
      isMenuOpen={navMenu.isOpen}
      onMenuOpenChange={navMenu.toggle}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <NavbarItem>
            <p className="font-bold text-inherit">
              <Link color="success" href="/">
                Seisan家計簿
              </Link>
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
