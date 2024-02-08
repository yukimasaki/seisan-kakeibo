"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import { pages } from "@components/navbar/pages";
import { usePathname } from "next/navigation";

export const NavbarComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <Navbar className="shadow" maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />

        <NavbarBrand>
          <NavbarItem>
            <p className="font-bold text-inherit">
              <Link href="/">Seisan家計簿</Link>
            </p>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {pages.map((page, idx) => (
          <NavbarMenuItem key={`${page}-${idx}`}>
            <Link
              color={currentPath === page.path ? "primary" : "foreground"}
              className={"w-full"}
              href={page.path}
              size={"lg"}
            >
              {page.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
