"use client";

import { ParagraphComponent } from "@components/text/paragraph";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { PaymentType } from "@type/entities/transaction";

export const BalanceInputComponent = ({ method }: { method: PaymentType }) => {
  const { data: session } = useSession();
  const members = session?.profile.activeGroup.members;

  const unit = (() => {
    if (method === "ratio") return "%";
    return "円";
  })();

  // input
  const [balances, setBalances] = useState(() => {
    if (!members) return [""];
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
      <input name={"memberCount"} value={balances.length} readOnly hidden />
      {members &&
        members.map((member, idx) => (
          <div key={member.userId} className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-end">
              <ParagraphComponent>{member.user.userName}</ParagraphComponent>
            </div>
            <div className="flex flex-row space-x-2 items-end">
              <Input
                name={`member.${idx}.balance`}
                value={balances[idx]}
                variant={"underlined"}
                type={"number"}
                inputMode={"numeric"}
                size={"sm"}
                classNames={{
                  input: "text-base",
                }}
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
