import { Button } from "@nextui-org/react";
import { Icon } from "@components/icon/icon";

export const ShareApiButton = () => {
  const data: ShareData = {
    title: "Google",
    text: "Googleのリンク",
    url: "https://www.google.com/",
  };

  const share = async () => {
    try {
      await navigator.share(data);
      // 成功時アクション
    } catch (error) {
      // 失敗時時アクション
    }
  };

  const isCanShare = "canShare" in navigator && navigator.canShare(data);

  return (
    <Button
      color={"primary"}
      radius={"md"}
      //   isIconOnly
      disabled={!isCanShare}
      onPress={share}
    >
      <div className="flex flex-row items-center">
        <Icon name="Add" className="text-white" />
        <p>メンバーを招待</p>
      </div>
    </Button>
  );
};
