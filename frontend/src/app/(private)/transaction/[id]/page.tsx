"use server";

import { NavbarComponent } from "@components/navbar";
import { TransactionDetailComponent } from "./transaction-detail";

const TransactionDetailPage = () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <NavbarComponent />
      <TransactionDetailComponent />
    </div>
  );
};

export default TransactionDetailPage;
