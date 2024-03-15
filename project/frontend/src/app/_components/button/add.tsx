"use client";

import { Icon } from "@frontend/components/icon/icon";
import { Button } from "@nextui-org/react";

export const AddButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Button
        color={"warning"}
        radius={"md"}
        isIconOnly
        onClick={() => onClick()}
      >
        <Icon name="Add" className="text-white" />
      </Button>
    </>
  );
};
