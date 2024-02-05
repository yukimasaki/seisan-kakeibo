"use client";

import { ListboxWrapperComponent } from "@components/layout/list-box-wrapper";
import { showToast } from "@components/toast/toast";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const SelectActiveGroup = () => {
  const { data: session, update } = useSession();
  const groups = session?.profile?.members;
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const updateSession = () => {
    const group = groups?.find(
      (group) => group.groupId === selectedGroup
    )?.group;
    update({ activeGroup: group });
    showToast({
      message: "グループを選択しました",
      type: "success",
      timerProgressBar: true,
      timer: 5000,
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showToast({
      message: "グループを選択してください",
      type: "warning",
      timerProgressBar: true,
      timer: 5000,
    });
    setLoading(false);
  }, [loading]);

  return (
    <div className="flex flex-col p-2 h-svh">
      <div className="flex-1">
        {/* 選択したグループをupdate()関数でsession.activeGroupにセットする */}
        {groups && (
          <ListboxWrapperComponent>
            <Listbox
              aria-label="Listbox menu with icons"
              variant="faded"
              selectionMode="single"
              onAction={(key) => setSelectedGroup(Number(key))}
            >
              {groups.map((group) => {
                return (
                  <ListboxItem key={group.groupId} startContent={group.groupId}>
                    {group.group.displayName}
                  </ListboxItem>
                );
              })}
            </Listbox>
          </ListboxWrapperComponent>
        )}
      </div>
      <div className="flex flex-col">
        <Button
          color={"primary"}
          variant={"flat"}
          className={"w-full"}
          isDisabled={!selectedGroup}
          onPress={() => updateSession()}
        >
          グループを選択する
        </Button>
      </div>
    </div>
  );
};
