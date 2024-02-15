"use client";

import { MemberResponse } from "@type/entities/member";
import { useSession } from "next-auth/react";

export const MetaInfoComponent = () => {
  const { data: session } = useSession();
  const members = session?.profile.activeGroup.members;

  return (
    <>
      {members && (
        <input name={"memberCount"} value={members.length} readOnly hidden />
      )}
      {members &&
        members.map((member, idx) => (
          <input
            name={`member.${idx}.userId`}
            value={member.userId}
            key={member.userId}
            readOnly
            hidden
          />
        ))}
    </>
  );
};
