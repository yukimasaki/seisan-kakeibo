"use client";

import { Icon } from "@components/icon/icon";
import { Button } from "@nextui-org/react";

export const DeleteButtonComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Button
        color={"warning"}
        radius={"md"}
        isIconOnly
        onClick={() => onClick()}
      >
        <Icon name="Delete" className="text-white" />
      </Button>
    </>
  );
};
