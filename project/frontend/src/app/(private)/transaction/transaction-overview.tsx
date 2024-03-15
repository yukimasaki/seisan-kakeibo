"use client";

import { FetchError, fetcher } from "@frontend/common/fetcher";
import { AddButtonComponent } from "@frontend/components/button/add";
import { FilterButtonComponent } from "@frontend/components/button/filter";
import { Icon } from "@frontend/components/icon/icon";
import { ListboxWrapperComponent } from "@frontend/components/layout/list-box-wrapper";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import useSWR from "swr";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@frontend/types/entities/transaction";
import { CreateTransactionForm } from "./transaction-create-form";
import { Calendar } from "@frontend/components/Calendar";
import { useOverviewCalendar } from "@frontend/hooks/useCalendar";
import { Summary } from "@frontend/types/calendar";
import { createSummary } from "@frontend/utils/createSummary";
import { useModalForm } from "@frontend/hooks/useToggle";
import { useSession } from "next-auth/react";

export const TransactionOverviewComponent = () => {
  const router = useRouter();

  const { data: session, update } = useSession();
  const groupId = session?.profile?.activeGroupId || 0;

  const calendarStore = useOverviewCalendar();
  const form = useModalForm();

  const {
    data: transactions,
    error,
    isLoading,
  }: {
    data: Transaction[];
    error: FetchError | undefined;
    isLoading: boolean;
  } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?start=${calendarStore.start}&end=${calendarStore.end}&groupId=${groupId}`,
      token: null,
    },
    fetcher,
    {
      keepPreviousData: true,
      onErrorRetry: (error) => {
        if (!error.ok) return;
      },
    },
  );

  const [isMonthChanged] = useState(false);

  useEffect(() => {
    if (calendarStore.isInit || isMonthChanged)
      calendarStore.setTransactions(transactions);
  }, [calendarStore.isInit, isMonthChanged, transactions]);

  const loadingState = isLoading ? "loading" : "idle";

  // blankとcurrentMonthを1つの配列に結合
  const summaries: Summary[] = createSummary({
    transactions: calendarStore.transactions ?? undefined,
    now: calendarStore.currentYearMonth,
  });

  const onListBoxItemClick = (key: Key) => {
    router.push(`/transaction/${key}`);
  };

  return (
    <>
      <div className="flex flex-col h-svh lg:w-[1024px] lg:self-center">
        <div className="flex-1 p-2 space-y-2">
          <div className="flex justify-end gap-2">
            <FilterButtonComponent />
            <AddButtonComponent
              onClick={() => {
                form.onOpen();
                update();
              }}
            />
          </div>

          <CreateTransactionForm />

          <Calendar summaries={summaries} store={useOverviewCalendar} />

          {/* 一覧 開始 */}
          <div>
            {loadingState === "loading" && <Spinner color="warning" />}
            {transactions && (
              <ListboxWrapperComponent>
                <Listbox
                  aria-label={"Transactions list"}
                  onAction={(key) => {
                    onListBoxItemClick(key);
                  }}
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
                              <span className="text-xs self-center">
                                {transaction.category.categoryName}
                              </span>
                            </div>
                            {/* 孫1-2 */}
                            <div className="flex gap-2">
                              <span className="text-xs self-center">
                                {dayjs(transaction.paymentDate)
                                  .locale("ja")
                                  .format("M/DD (dd)")}
                              </span>
                              <span className="text-xs self-center">
                                {transaction.title}
                              </span>
                            </div>
                          </div>

                          {/* 子2 */}
                          <div className="flex flex-col">
                            {/* 孫2-1 */}
                            <div className="flex gap-2 space-x-0.5">
                              <span className="text-xs self-center">
                                {transaction.amount}
                              </span>
                              <span className="text-xs self-center">円</span>
                            </div>
                          </div>
                        </div>
                      </ListboxItem>
                    );
                  })}
                </Listbox>
              </ListboxWrapperComponent>
            )}
            {/* 一覧 終了 */}
          </div>
        </div>
      </div>
    </>
  );
};
