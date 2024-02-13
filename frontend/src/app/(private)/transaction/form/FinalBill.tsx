"use client";

import { ParagraphComponent } from "@components/text/paragraph";
import { Input } from "@nextui-org/react";
import { MemberResponse } from "@type/entities/member";

export const FinalBillComponent = ({
  members,
}: {
  members: MemberResponse[];
}) => {
  return (
    <>
      <input name={"memberCount"} value={members.length} readOnly hidden />
      {members.map((member, idx) => (
        <div key={member.userId} className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <ParagraphComponent>{member.user.userName}</ParagraphComponent>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Input
              name={`member.${idx}.finalBill`}
              size={"sm"}
              variant="underlined"
            />
            <ParagraphComponent>円</ParagraphComponent>
          </div>
        </div>
      ))}
    </>
  );
};
