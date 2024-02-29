"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@components/icon/icon";
import { usePathname } from "next/navigation";

// https://zenn.dev/mr_ozin/articles/89329c5209d8da#share-api
export const Invite = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  const path = usePathname();

  const data: ShareData = {
    title: "Seisan家計簿",
    text: "Seisan家計簿のリンク",
    url: `${path}`,
  };

  const share = async () => {
    try {
      await navigator.share(data);
      // 成功時アクション
    } catch (error) {
      // 失敗時時アクション
    }
  };

  return (
    <Button
      color={"primary"}
      radius={"md"}
      onPress={share}
      isDisabled={isDisabled}
    >
      <div className="flex flex-row items-center">
        <Icon name="Add" className="text-white" />
        <p>メンバーを招待</p>
      </div>
    </Button>
  );
};
