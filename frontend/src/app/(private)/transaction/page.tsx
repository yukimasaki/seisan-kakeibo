"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { TransactionOverviewComponent } from "./transaction-overview";
import { SwitchButton } from "@components/navbar/switch-button";

const TransactionPage = async () => {
  return (
    <>
      <div className="flex flex-col justify-between h-svh">
        <NavbarComponent>
          <SwitchButton />
        </NavbarComponent>
        <TransactionOverviewComponent />
      </div>
    </>
  );
};

export default TransactionPage;
