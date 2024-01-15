"use client";

import { fetcher } from "@common/fetcher";
import { AddButtonComponent } from "@components/button/add";
import { FilterButtonComponent } from "@components/button/filter";
import { Input } from "@nextui-org/react";
import dayjs from "dayjs";
import useSWR from "swr";

export const TransactionOverviewComponent = () => {
  type Transaction = {
    id: number;
    creatorId: number;
    editorId: number;
    amount: number;
    paymentDate: Date;
    title: string;
    memo: string;
    status: string;
    categoryId: number;
    groupId: number;
  };

  const dayLabels = [
    {
      key: "sunday",
      label: "日",
    },
    {
      key: "monday",
      label: "月",
    },
    {
      key: "tuesday",
      label: "火",
    },
    {
      key: "wednesday",
      label: "水",
    },
    {
      key: "thursday",
      label: "木",
    },
    {
      key: "friday",
      label: "金",
    },
    {
      key: "saturday",
      label: "土",
    },
  ];

  const {
    data: transactions,
    error,
    isLoading,
  }: {
    data: Transaction[],
    error: any,
    isLoading: boolean,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, fetcher, {
    keepPreviousData: true,
  });

  // 現在時刻をストアに格納
  const currentYearMonth = dayjs();

  // 月初の日付
  const startDate = currentYearMonth.startOf('month');
  // 月末の日付
  const endDate = currentYearMonth.endOf('month').get('date');
  // 月初の曜日
  const startWeekday = currentYearMonth.startOf('month').get('day');

  // 渡された文字列が今日の日付か判定する関数
  const isToday = (
    date: string,
  ) => {
    const todayString = new Date().toDateString();
    const dateString = new Date(date).toDateString();

    if (todayString === dateString) return true;
    return false;
  };

  // 日ごとの金額を小計する関数
  const reduceAmounts = (
    transactions: Transaction[] | null,
  ): Map<string, number> | null => {
    if (!transactions) return null;

    const summaryMap: Map<string, number> = new Map();
    transactions.forEach(transaction => {
      const paymentDateStr = dayjs(transaction.paymentDate).format('YYYY/MM/DD');
      const amount = transaction.amount;

      if (summaryMap.has(paymentDateStr)) {
        // Map内に既に存在する日付の場合、金額を加算
        summaryMap.set(paymentDateStr, (summaryMap.get(paymentDateStr) || 0) + amount);
      } else {
        // Map内に存在しない日付の場合、金額を初期化
        summaryMap.set(paymentDateStr, amount);
      }
    });

    return summaryMap;
  };

  // カレンダーに表示する配列を生成
  // 月初までは全てのプロパティに空欄を格納
  const blank = Array.from({ length: startWeekday }, (_, index) => {
    const incrementalNumber = index + 1
    return {
      id: incrementalNumber,
      label: '',
      date: '',
      amount: 0,
    }
  });

  // 当月のデータを生成
  const amountsPerDay = reduceAmounts(transactions);
  const currentMonth = Array.from({ length: endDate }, (_, index) => {
    const incrementalNumber = index + 1;
    const date = dayjs(startDate).add(index, 'day').format('YYYY/MM/DD');
    return {
      id: blank.length + incrementalNumber,
      label: incrementalNumber.toString(),
      date,
      amount: amountsPerDay === null ? 0 : (amountsPerDay.get(date) || 0),
    }
  });

  // blankとcurrentMonthを1つの配列に結合
  const summaries = [
    ...blank,
    ...currentMonth,
  ];

  return (
    <>
      <div className="flex flex-col h-svh">
        <div className="flex-1 p-2 space-y-2">
          <div className="flex justify-between gap-2">
            {/* todo: あとで年月ピッカーに置き換える */}
            <Input
              placeholder={"検索"}
              type={"text"}
              size={"sm"}
              classNames={{
                inputWrapper: "h-10"
              }}
              isClearable
            />
            <FilterButtonComponent />
            <AddButtonComponent />
          </div>

          {/* カレンダー 開始 */}
          <div className="rounded-md shadow lg:w-1/3">
            <div className="grid grid-cols-7 gap-2 py-1 bg-gray-400 rounded-t-md">
              {dayLabels.map((dayLabel) => {
                return (
                  <span
                    key={dayLabel.key}
                    className="self-center justify-self-center border-gray-300 text-gray-50 text-xs pt-0.5 px-2"              >
                    {dayLabel.label}
                  </span>
                );
              })}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {summaries.map((summary) => {
                return (
                  <div
                    className="flex flex-col h-12 mx-auto justify-center"
                    key={summary.id}
                  >
                    <div className={`top h-5 w-full text-sm text-center ${isToday(summary.date) ? "text-red-400" : ""}`}>
                      {summary.label}
                    </div>
                    <div className="bottom flex-grow h-7 py-1 w-full cursor-pointer text-center">
                      <div className="text-xs text-gray-500">{summary.amount > 0 ? summary.amount.toLocaleString() : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* カレンダー 終了 */}

          {/* 一覧 開始 */}
          <div>test</div>
          {/* 一覧 終了 */}
        </div>
      </div>
    </>
  );
}
