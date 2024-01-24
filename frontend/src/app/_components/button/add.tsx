"use client";

import { Icon } from "@components/icon/icon";
import { Button } from "@nextui-org/react";

export const AddButtonComponent = ({
  onClickFn,
}: {
  onClickFn: () => void,
}) => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
        onClick={onClickFn}
      >
        <Icon name="Add" className="text-white" />
      </Button>
    </>
  );
}
