"use client";

import { ParagraphComponent } from "@components/text/paragraph";
import { Input } from "@nextui-org/react";
import { MemberResponse } from "@type/entities/member";
import { PaymentType } from "../transaction-server-action";

export const RatioComponent = ({
  members,
  tag,
}: {
  members: MemberResponse[];
  tag: PaymentType;
}) => {
  const unit = (() => {
    if (tag === "ratio") return "%";
    return "円";
  })();

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
              name={`member.${idx}.ratio`}
              size={"sm"}
              variant="underlined"
            />
            <ParagraphComponent>{unit}</ParagraphComponent>
          </div>
        </div>
      ))}
    </>
  );
};
