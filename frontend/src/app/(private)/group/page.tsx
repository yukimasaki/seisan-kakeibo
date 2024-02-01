"use server";

import { HeaderComponent } from "@components/header";
import { GroupCreateFormComponent } from "./group-create-form";

const GroupPage = () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <HeaderComponent />
      <GroupCreateFormComponent />
    </div>
  );
};

export default GroupPage;
