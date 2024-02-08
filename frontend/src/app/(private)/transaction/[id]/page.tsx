"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { TransactionDetailComponent } from "./transaction-detail";

const TransactionDetailPage = async () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <NavbarComponent />
      <TransactionDetailComponent />
    </div>
  );
};

export default TransactionDetailPage;
