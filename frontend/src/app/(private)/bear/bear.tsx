"use client";

import { Button } from "@nextui-org/react";
import { bearsStore } from "@store/bearStore";

export const BearComponent = () => {
  const bears = bearsStore((state) => state.bears);
  const increaseBear = bearsStore((state) => state.increaseBear);

  return (
    <>
      <div>
        🐻: {bears}
      </div>
      <Button onClick={() => increaseBear(1)}>
        + 1
      </Button>
    </>
  );
};
