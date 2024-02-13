"use client";

import { MemberResponse } from "@type/entities/member";

export const MetaInfoComponent = ({
  members,
}: {
  members: MemberResponse[];
}) => {
  return (
    <>
      <input name={"memberCount"} value={members.length} readOnly hidden />
      {members.map((member, idx) => (
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
