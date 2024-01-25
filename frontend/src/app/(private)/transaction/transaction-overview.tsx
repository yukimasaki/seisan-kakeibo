"use client";

import { fetcher } from "@common/fetcher";
import { AddButtonComponent } from "@components/button/add";
import { FilterButtonComponent } from "@components/button/filter";
import { Icon } from "@components/icon/icon";
import { ListboxWrapperComponent } from "@components/layout/list-box-wrapper";
import { Button, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import useSWR from "swr";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@type/transaction";
import useModalForm from "@hooks/useModalForm";
import { CreateTransactionForm } from "./create-form";
import { CalendarComponent } from "@components/calendar";
import { useCalendar } from "@hooks/useCalendar";
import { Summary } from "@type/calendar";
import { createSummary } from "@utils/createSummary";

export const TransactionOverviewComponent = () => {
  const router = useRouter();

  const calendarStore = useCalendar();
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

  const [currentYearMonth, setCurrentYearMonth] = useState(dayjs());
  const [fullTransactions, setFullTransactions] = useState(transactions);
  const [isMonthChanged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(parseInt(currentYearMonth.format("YYYY")));
  const [selectedMonth, setSelectedMonth] = useState(parseInt(currentYearMonth.format("M")));

  useEffect(() => {
    calendarStore.setStart(currentYearMonth.startOf("month").format("YYYY-MM-DD"));
    calendarStore.setEnd(currentYearMonth.endOf("month").format("YYYY-MM-DD"));
    setSelectedYear(parseInt(currentYearMonth.format("YYYY")));
    setSelectedMonth(parseInt(currentYearMonth.format("M")));
  }, [currentYearMonth]);

  useEffect(() => {
    if (calendarStore.isInit || isMonthChanged) setFullTransactions(transactions);
  }, [calendarStore.isInit, isMonthChanged, transactions]);

  useEffect(() => {
    if (!isYearMonthModalOpen) setCurrentYearMonth(dayjs(`${selectedYear}-${selectedMonth}-01`));
  }, [selectedYear, selectedMonth]);

  const loadingState = isLoading ? "loading" : "idle";

  // blankとcurrentMonthを1つの配列に結合
  const summaries: Summary[] = createSummary(fullTransactions || transactions, currentYearMonth);

  const onListBoxItemClick = (
    key: Key,
  ) => {
    router.push(`/transaction/${key}`);
  }

  const { isOpen: isYearMonthModalOpen, onOpen: onYearMonthModalOpen, onOpenChange } = useDisclosure();

  const monthsOfYear = Array.from({ length: 12 }, (_, idx) => ({
    id: idx + 1,
    value: idx + 1,
  }));

  return (
    <>
      <div className="flex flex-col h-svh">
        <div className="flex-1 p-2 space-y-2">
          <div className="flex justify-between gap-2">
            {/* 年月ピッカー ここから */}
            <Input
              placeholder={currentYearMonth.format("YYYY年M月")}
              type={"text"}
              size={"sm"}
              classNames={{
                inputWrapper: "h-10"
              }}
              onClick={onYearMonthModalOpen}
              isClearable
              readOnly
            />
            <Modal
              isOpen={isYearMonthModalOpen}
              onOpenChange={onOpenChange}
              hideCloseButton
              placement="center"
              backdrop="blur"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader></ModalHeader>
                    <ModalBody >
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-row justify-center items-center">
                          <Button isIconOnly variant="light" onPress={() => setSelectedYear((prev) => prev - 1)}>
                            <Icon name={"Back"} size={24} />
                          </Button>
                          <div className="px-4 text-lg">{selectedYear}年</div>
                          <Button isIconOnly variant="light" onPress={() => setSelectedYear((prev) => prev + 1)}>
                            <Icon name={"Forward"} size={24} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {monthsOfYear.map(month => (
                            <Button
                              key={month.id}
                              value={month.value}
                              onClick={() => {
                                setSelectedMonth(month.value);
                                onClose();
                              }}
                              variant="flat"
                              color={month.value === selectedMonth ? "primary" : "default"}
                            >
                              {month.value}月
                            </Button>
                          ))}
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color={"danger"} variant="light" onPress={onClose}>閉じる</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div className="flex flex-row gap-1">
              <Button isIconOnly variant="flat" onPress={() => setCurrentYearMonth(currentYearMonth.subtract(1, "month"))}>
                <Icon name={"Back"} size={24} />
              </Button>
              <Button isIconOnly variant="flat" onPress={() => setCurrentYearMonth(currentYearMonth.add(1, "month"))}>
                <Icon name={"Forward"} size={24} />
              </Button>
            </div>
            {/* 年月ピッカー ここまで */}
            <FilterButtonComponent />
            <AddButtonComponent onClick={() => form.onOpen()} />
          </div>
          <CreateTransactionForm />

          <CalendarComponent
            summaries={summaries}
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
