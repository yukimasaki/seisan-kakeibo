"use client";

import { useSession } from "next-auth/react";

export const GroupMemberListComponent = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col p-2 h-svh">
      選択中のグループ:{session?.activeGroup?.displayName}
    </div>
  );
};
