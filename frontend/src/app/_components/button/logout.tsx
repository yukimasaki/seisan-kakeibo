"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const LogoutButtonComponent = () => {
  return (
    <Button
      as={Link}
      color="warning"
      href="#"
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="flat"
    >
      Logout
    </Button>
  );
};
