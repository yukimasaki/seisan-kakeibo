"use server";

import { NavBar } from "@components/navbar/NavBar";
import { GroupCreateFormComponent } from "./group-create-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@common/next-auth/options";
import { GroupMemberListComponent } from "./group-member-list";
import { SelectActiveGroup } from "./select-active-group";

const GroupPage = async () => {
  const session = await getServerSession(authOptions);

  const renderGroupPage = () => {
    if (session?.profile?.belongingGroups.length === 0)
      return <GroupCreateFormComponent />;
    if (!session?.profile.activeGroup) return <SelectActiveGroup />;
    return <GroupMemberListComponent />;
  };

  return (
    <div className="flex flex-col h-svh">
      <NavBar />
      {renderGroupPage()}
    </div>
  );
};

export default GroupPage;
