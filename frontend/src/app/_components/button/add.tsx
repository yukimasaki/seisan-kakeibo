"use client";

import { Icon } from "@components/icon/icon";
import { Button } from "@nextui-org/react";

export const AddButtonComponent = () => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
      >
        <Icon name="Add" className="text-white" />
      </Button>
    </>
  );
}
