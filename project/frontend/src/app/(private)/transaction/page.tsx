"use server";

import { NavBar } from "@frontend/components/navbar/NavBar";
import { TransactionOverviewComponent } from "./transaction-overview";

const TransactionPage = async () => {
  return (
    <>
      <div className="flex flex-col justify-between h-svh">
        <NavBar />
        <TransactionOverviewComponent />
      </div>
    </>
  );
};

export default TransactionPage;
