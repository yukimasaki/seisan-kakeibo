"use client";

import { Icon } from "@components/icon/icon";
import { Button } from "@nextui-org/react";

export const AddButtonComponent = ({
  onClick,
}: {
  onClick: () => void,
}) => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
        onClick={onClick}
      >
        <Icon name="Add" className="text-white" />
      </Button>
    </>
  );
}
