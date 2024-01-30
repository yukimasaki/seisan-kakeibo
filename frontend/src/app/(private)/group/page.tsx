"use server";

import { HeaderComponent } from "@components/header";
import { GroupFormComponent } from "./group-create-form";

const GroupPage = () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <HeaderComponent />
      <GroupFormComponent />
    </div>
  );
};

export default GroupPage;
