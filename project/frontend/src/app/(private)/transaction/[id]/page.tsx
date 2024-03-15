"use server";

import { NavBar } from "@frontend/components/navbar/NavBar";
import { TransactionDetailComponent } from "./transaction-detail";

const TransactionDetailPage = async () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <NavBar />
      <TransactionDetailComponent />
    </div>
  );
};

export default TransactionDetailPage;
