"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { TransactionOverviewComponent } from "./transaction-overview";

const TransactionPage = async () => {
  return (
    <>
      <div className="flex flex-col justify-between h-svh">
        <NavbarComponent />
        <TransactionOverviewComponent />
      </div>
    </>
  );
};

export default TransactionPage;
