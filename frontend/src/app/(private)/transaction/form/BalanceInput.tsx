"use client";

import { ParagraphComponent } from "@components/text/paragraph";
import { Input } from "@nextui-org/react";
import { PaymentType } from "../transaction-server-action";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const BalanceInputComponent = ({ tag }: { tag: PaymentType }) => {
  const { data: session } = useSession();
  const members = session?.profile.activeGroup.members;
  if (!members) return null;

  const unit = (() => {
    if (tag === "ratio") return "%";
    return "円";
  })();

  // input
  const [balances, setBalances] = useState(() => {
    return members.map(() => "");
  });

  const handleChange = (idx: number, value: string) => {
    const newBalances = [...balances];
    newBalances[idx] = value;
    setBalances(newBalances);
  };

  const handleClear = (idx: number) => {
    const newBalances = [...balances];
    newBalances[idx] = "";
    setBalances(newBalances);
  };

  return (
    <>
      <input name={"memberCount"} value={members.length} readOnly hidden />
      {members.map((member, idx) => (
        <div key={member.userId} className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-end">
            <ParagraphComponent>{member.user.userName}</ParagraphComponent>
          </div>
          <div className="flex flex-row space-x-2 items-end">
            <Input
              name={`member.${idx}.balance`}
              value={balances[idx]}
              size={"sm"}
              variant="underlined"
              onChange={(e) => handleChange(idx, e.target.value)}
              onClear={() => handleClear(idx)}
              isClearable
            />
            <ParagraphComponent>{unit}</ParagraphComponent>
          </div>
        </div>
      ))}
    </>
  );
};
