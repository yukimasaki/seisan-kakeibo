"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@frontend/components/icon/icon";
import { inviteGroup } from "../../(private)/group/group-server-action";
import { usePathname } from "next/navigation";
import { useRootPath } from "@frontend/hooks/useRootPath";

// https://zenn.dev/mr_ozin/articles/89329c5209d8da#share-api
export const Invite = ({
  isDisabled = false,
  groupId,
}: {
  isDisabled?: boolean;
  groupId: number;
}) => {
  const rootPath = useRootPath();

  const createInviteToken = async () => {
    return await inviteGroup(groupId);
  };

  const share = async (data: ShareData) => {
    try {
      await navigator.share(data);
      // 成功時アクション
    } catch (error) {
      // 失敗時時アクション
    }
  };

  const handleClick = async () => {
    const inviteToken = await createInviteToken();

    const data: ShareData = {
      title: "Seisan家計簿",
      text: "Seisan家計簿のリンク",
      url: `${rootPath}/join/?token=${inviteToken.token}`,
    };
    await share(data);
  };

  return (
    <Button
      color={"warning"}
      radius={"md"}
      onPress={handleClick}
      isDisabled={isDisabled}
    >
      <div className="flex flex-row items-center">
        <Icon name="Add" className="text-white" />
        <p className="text-white">メンバーを招待</p>
      </div>
    </Button>
  );
};
