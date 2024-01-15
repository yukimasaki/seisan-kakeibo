"use client";

import { PlusIcon } from "@components/icon/plus";
import { Button } from "@nextui-org/react";

export const AddButtonComponent = () => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
      >
        <PlusIcon />
      </Button>
    </>
  );
}
