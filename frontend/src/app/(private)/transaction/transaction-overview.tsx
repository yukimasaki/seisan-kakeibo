"use client";

import { fetcher } from "@common/fetcher";
import { AddButtonComponent } from "@components/button/add";
import { FilterButtonComponent } from "@components/button/filter";
import { Icon } from "@components/icon/icon";
import { ListboxWrapperComponent } from "@components/layout/list-box-wrapper";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import useSWR from "swr";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@type/transaction";
import useModalForm from "@hooks/useModalForm";
import { CreateTransactionForm } from "./create-form";
import { CalendarComponent } from "@components/calendar";
import { useOverviewCalendar } from "@hooks/useCalendar";
import { Summary } from "@type/calendar";
import { createSummary } from "@utils/createSummary";

export const TransactionOverviewComponent = () => {
  const router = useRouter();

  const calendarStore = useOverviewCalendar();
  const form = useModalForm();

  const {
    data: transactions,
    error,
    isLoading,
  }: {
    data: Transaction[],
    error: any,
    isLoading: boolean,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?start=${calendarStore.start}&end=${calendarStore.end}`, fetcher, {
    keepPreviousData: true,
  });

  const [fullTransactions, setFullTransactions] = useState(transactions);
  const [isMonthChanged] = useState(false);

  useEffect(() => {
    if (calendarStore.isInit || isMonthChanged) setFullTransactions(transactions);
  }, [calendarStore.isInit, isMonthChanged, transactions]);

  const loadingState = isLoading ? "loading" : "idle";

  // blankとcurrentMonthを1つの配列に結合
  const summaries: Summary[] = createSummary(fullTransactions || transactions, calendarStore.currentYearMonth);

  const onListBoxItemClick = (
    key: Key,
  ) => {
    router.push(`/transaction/${key}`);
  }

  return (
    <>
      <div className="flex flex-col h-svh">
        <div className="flex-1 p-2 space-y-2">
          <div className="flex justify-end gap-2">
            <FilterButtonComponent />
            <AddButtonComponent onClick={() => form.onOpen()} />
          </div>

          <CreateTransactionForm />

          <CalendarComponent
            summaries={summaries}
            store={useOverviewCalendar}
          />

          {/* 一覧 開始 */}
          <div>
            {loadingState === "loading" && <Spinner />}
            {transactions &&
              <ListboxWrapperComponent>
                <Listbox
                  aria-label={"Transactions list"}
                  onAction={(key) => { onListBoxItemClick(key) }}
                >
                  {transactions.map((transaction) => {
                    return (
                      <ListboxItem key={transaction.id} textValue="Items">
                        {/* 親 */}
                        <div className="flex flex-row justify-between">
                          {/* 子1 */}
                          <div className="flex flex-col">
                            {/* 孫1-1 */}
                            <div className="flex gap-2">
                              <Icon name="Groups" className="text-green-500" />
                              <span className="text-xs self-center">{transaction.category.category}</span>
                            </div>
                            {/* 孫1-2 */}
                            <div className="flex gap-2">
                              <span className="text-xs self-center">{dayjs(transaction.paymentDate).locale("ja").format("M/DD (dd)")}</span>
                              <span className="text-xs self-center">{transaction.title}</span>
                            </div>
                          </div>

                          {/* 子2 */}
                          <div className="flex flex-col">
                            {/* 孫2-1 */}
                            <div className="flex gap-2 space-x-0.5">
                              <span className="text-xs self-center">{transaction.amount}</span>
                              <span className="text-xs self-center">円</span>
                            </div>
                          </div>
                        </div>
                      </ListboxItem>
                    );
                  })}
                </Listbox>
              </ListboxWrapperComponent>
            }
            {/* 一覧 終了 */}
          </div>
        </div>
      </div>
    </>
  );
}
