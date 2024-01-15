"use client";

import { FilterIcon } from "@components/icon/filter";
import { Button } from "@nextui-org/react";

export const FilterButtonComponent = () => {
  return (
    <>
      <Button
        color={"primary"}
        radius={"md"}
        isIconOnly
      >
        <FilterIcon />
      </Button>
    </>
  );
}
