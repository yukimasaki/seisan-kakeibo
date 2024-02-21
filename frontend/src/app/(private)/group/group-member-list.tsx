"use client";

import { ShareApiButton } from "@components/button/ShareApi";
import { DeleteButtonComponent } from "@components/button/delete";
import { ListboxWrapperComponent } from "@components/layout/list-box-wrapper";
import { PositionCenterWrapperComponent } from "@components/layout/position-center-wrapper";
import { ParagraphComponent } from "@components/text/paragraph";
import {
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export const GroupMemberListComponent = () => {
  const { data: session } = useSession();
  const groupName = session?.profile.activeGroup.displayName;
  const members = session?.profile.activeGroup.members;

  return (
    <PositionCenterWrapperComponent>
      <Card className="w-full h-fit max-w-[720px]">
        <CardHeader className="flex flex-col items-start gap-3">
          <h5 className={"text-blue-400 font-bold"}>選択中のグループ</h5>
          <ParagraphComponent>{groupName}</ParagraphComponent>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex flex-row items-center justify-between">
            <h5 className={"text-blue-400 font-bold"}>メンバー</h5>
            <ShareApiButton />
          </div>
          {members && (
            <ListboxWrapperComponent>
              <Listbox
                items={members}
                aria-label="Listbox menu with icons"
                variant="faded"
              >
                {(member) => (
                  <ListboxItem key={member.userId} textValue="Items">
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-base">{member.user.userName}</p>
                      <DeleteButtonComponent onClick={() => {}} />
                    </div>
                  </ListboxItem>
                )}
              </Listbox>
            </ListboxWrapperComponent>
          )}
        </CardBody>
      </Card>
    </PositionCenterWrapperComponent>
  );
};
