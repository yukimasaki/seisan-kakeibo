import { Summary } from "@type/calendar";
import { Transaction } from "@type/transaction";
import dayjs from "dayjs";

const reduce = (
  transactions: Transaction[],
): Map<string, number> => {
  const summaryMap: Map<string, number> = new Map();
  transactions.forEach(transaction => {
    const paymentDateStr = dayjs(transaction.paymentDate).format("YYYY-MM-DD");

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

export const createSummary = ({
  transactions,
  now,
}: {
  transactions?: Transaction[],
  now?: dayjs.Dayjs,
}) => {
  const baseDate = now || dayjs();
  const startWeekday = baseDate.startOf("month").get("day");
  const startDate = baseDate.startOf("month");
  const endDate = baseDate.endOf("month").get("date");

  if (transactions) {
    const blankData: Summary[] = Array.from({ length: startWeekday }, (_, idx) => ({
      tag: "overview",
      id: idx + 1,
      label: "",
      date: "",
      amount: 0,
    }));

    const reducedAmountPerDay = reduce(transactions);

    const filledData: Summary[] = Array.from({ length: endDate }, (_, idx) => {
      const date = dayjs(startDate).add(idx, "day").format("YYYY-MM-DD");

      return {
        tag: "overview",
        id: (blankData.length) + (idx + 1),
        label: (idx + 1).toString(),
        date,
        amount: reducedAmountPerDay === null ? 0 : (reducedAmountPerDay.get(date) || 0),
      }
    });

    return [
      ...blankData,
      ...filledData,
    ];
  } else {
    const blankData: Summary[] = Array.from({ length: startWeekday }, (_, idx) => ({
      tag: "date_picker",
      id: idx + 1,
      label: "",
      date: "",
    }));

    const filledData: Summary[] = Array.from({ length: endDate }, (_, idx) => {
      const date = dayjs(startDate).add(idx, "day").format("YYYY-MM-DD");

      return {
        tag: "date_picker",
        id: (blankData.length) + (idx + 1),
        label: (idx + 1).toString(),
        date,
      }
    });

    return [
      ...blankData,
      ...filledData,
    ];
  }
};
