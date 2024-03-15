"use client";

import { pages } from "@frontend/components/navbar/pages";
import { useNavMenu } from "@frontend/hooks/useToggle";
import {
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const NavMenu = () => {
  const navMenu = useNavMenu();
  const currentPath = usePathname();

  return (
    <>
      <NavbarMenuToggle
        aria-label={navMenu.isOpen ? "Close menu" : "Open menu"}
      />
      <NavbarMenu>
        {pages.map((page, idx) => (
          <NavbarMenuItem key={`${page}-${idx}`}>
            <Link
              color={currentPath === page.path ? "success" : "foreground"}
              className={"w-full"}
              href={page.path}
              size={"lg"}
            >
              {page.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </>
  );
};
