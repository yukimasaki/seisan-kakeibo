"use client";

import { useCalendar } from "@hooks/useCalendar";
import { DayLabel, Summary } from "@type/calendar";
import dayjs from "dayjs";
import { useState } from "react";

export const CalendarComponent = ({
  dayLabels,
  summaries,
}: {
  dayLabels: DayLabel[],
  summaries: Summary[],
}) => {
  const calendarStore = useCalendar();
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  // 渡された文字列が今日の日付か判定する関数
  const isToday = (
    date: string,
  ) => {
    const todayString = new Date().toDateString();
    const dateString = new Date(date).toDateString();

    if (todayString === dateString) return true;
    return false;
  };


  const onDateClick = (
    date: string,
  ) => {
    calendarStore.setIsInit(false);
    setSelectedDate(date);
    calendarStore.setStart(date);
    calendarStore.setEnd(dayjs(date).add(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <>
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
                className={`flex flex-col h-10 mx-auto justify-center min-w-full rounded-md ${selectedDate === summary.date ? "bg-blue-100 shadow-sm" : ""}`}
                key={summary.id}
                onClick={() => onDateClick(summary.date)}
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
    </>
  )
};
