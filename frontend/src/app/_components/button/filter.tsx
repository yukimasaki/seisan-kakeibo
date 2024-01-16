"use client";

import { Icon } from "@components/icon/icon";
import { Button } from "@nextui-org/react";

export const FilterButtonComponent = () => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
      >
        <Icon name="Filter" className="text-white" />
      </Button>
    </>
  );
}
