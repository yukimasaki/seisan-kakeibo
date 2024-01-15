"use server";

import { HeaderComponent } from "@components/header";
import { TransactionOverviewComponent } from "./transaction-overview";

const TransactionPage = async () => {
  return (
    <>
      <div className="flex flex-col justify-between h-svh">
        <HeaderComponent />
        <TransactionOverviewComponent />
      </div>
    </>
  );
}

export default TransactionPage;
