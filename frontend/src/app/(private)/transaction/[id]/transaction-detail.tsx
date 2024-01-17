"use client";

import { fetcher } from "@common/fetcher";
import { Transaction } from "@type/transaction";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export const TransactionDetailComponent = () => {
  const path = usePathname();
  const id = path.replace("/transaction/", "");

  const {
    data: transaction,
    error,
    isLoading,
  }: {
    data: Transaction,
    error: any,
    isLoading: boolean,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`, fetcher, {
    keepPreviousData: true,
  });

  return (
    <>
    </>
  );
};
