"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { TransactionDetailComponent } from "./transaction-detail";
import { SwitchButton } from "@components/navbar/switch-button";

const TransactionDetailPage = async () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <NavbarComponent>
        <SwitchButton />
      </NavbarComponent>
      <TransactionDetailComponent />
    </div>
  );
};

export default TransactionDetailPage;
