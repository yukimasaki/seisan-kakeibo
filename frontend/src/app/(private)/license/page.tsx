"use server";

import { HeaderComponent } from "@components/header";
import { LicenseTableComponent } from "./license-table";

const LicensePage = async () => {

  return (
    <>
      <div className="flex flex-col justify-between h-svh">
        <HeaderComponent />
        <LicenseTableComponent />
      </div>
    </>
  );
}

export default LicensePage;
