"use server";

import { HeaderComponent } from "@components/header";
import TransactionDetailComponent from "./transaction-detail";

const TransactionDetailPage = () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <HeaderComponent />
      <TransactionDetailComponent />
    </div>
  );
};

export default TransactionDetailPage;
