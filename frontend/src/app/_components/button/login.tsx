"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const LoginButtonComponent = () => {
  return (
    <Button as={Link} color="primary" href="#" onClick={() => signIn()} variant="flat">
      Login
    </Button>
  );
}
