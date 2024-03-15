"use client";

import { Icon } from "@frontend/components/icon/icon";
import { Button } from "@nextui-org/react";

export const FilterButtonComponent = () => {
  return (
    <>
      <Button color={"warning"} radius={"md"} isIconOnly>
        <Icon name="Filter" className="text-white" />
      </Button>
    </>
  );
};
