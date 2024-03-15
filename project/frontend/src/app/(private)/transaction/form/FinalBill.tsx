"use client";

import { ParagraphComponent } from "@components/text/paragraph";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const FinalBillComponent = () => {
  const { data: session } = useSession();
  const members = session?.profile.activeGroup.members;

  // input
  const [finalBills, setFinalBills] = useState(() => {
    if (!members) return [""];
    return members.map(() => "");
  });

  const handleChange = (idx: number, value: string) => {
    const newFinalBills = [...finalBills];
    newFinalBills[idx] = value;
    setFinalBills(newFinalBills);
  };

  const handleClear = (idx: number) => {
    const newFinalBills = [...finalBills];
    newFinalBills[idx] = "";
    setFinalBills(newFinalBills);
  };

  return (
    <>
      <input name={"memberCount"} value={finalBills.length} readOnly hidden />
      {members &&
        members.map((member, idx) => (
          <div key={member.userId} className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-end">
              <ParagraphComponent>{member.user.userName}</ParagraphComponent>
            </div>
            <div className="flex flex-row space-x-2 items-end">
              <Input
                name={`member.${idx}.finalBill`}
                value={finalBills[idx]}
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
              <ParagraphComponent>円</ParagraphComponent>
            </div>
          </div>
        ))}
    </>
  );
};
