"use server";

import { NavBar } from "@frontend/components/navbar/NavBar";
import { JoinGroup } from "./JoinGroup";

const JoinPage = async () => {
  return (
    <div className="flex flex-col h-svh">
      <NavBar />
      <JoinGroup />
    </div>
  );
};

export default JoinPage;
