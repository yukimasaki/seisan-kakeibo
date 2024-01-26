"use client";

import { Icon } from "@components/icon/icon";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { CalendarStore, DayLabel, Summary } from "@type/calendar";
import dayjs from "dayjs";
import { StoreApi, UseBoundStore } from "zustand";

const defaultDayLabels = [
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

const monthsOfYear = Array.from({ length: 12 }, (_, idx) => ({
  id: idx + 1,
  value: idx + 1,
}));

export const CalendarComponent = ({
  dayLabels = defaultDayLabels,
  summaries,
  store,
}: {
  dayLabels?: DayLabel[],
  summaries: Summary[],
  store: UseBoundStore<StoreApi<CalendarStore>>,
}) => {
  const calendarStore = store();

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
    calendarStore.setSelectedDate(date);
    calendarStore.setStart(date);
    calendarStore.setEnd(dayjs(date).add(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <div className="flex flex-col space-y-1">
      {/* 年月ピッカー ここから */}
      <div className="flex justify-between gap-2">
        <Popover
          backdrop="blur"
        >
          <PopoverTrigger>
            <Input
              value={calendarStore.currentYearMonth.format("YYYY年M月")}
              type={"text"}
              size={"sm"}
              classNames={{
                inputWrapper: "h-full shadow-none"
              }}
              readOnly
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-center items-center">
                <Button isIconOnly variant="light" onPress={() => calendarStore.decreaseYear()}>
                  <Icon name={"Back"} size={24} />
                </Button>
                <div className="px-4 text-lg">{calendarStore.selectedYear}年</div>
                <Button isIconOnly variant="light" onPress={() => calendarStore.increaseYear()}>
                  <Icon name={"Forward"} size={24} />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {monthsOfYear.map(month => (
                  <Button
                    key={month.id}
                    value={month.value}
                    onClick={() => {
                      calendarStore.setSelectedMonth(month.value);
                    }}
                    variant="flat"
                    color={month.value === calendarStore.selectedMonth ? "primary" : "default"}
                  >
                    {month.value}月
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex flex-row gap-1">
          <Button isIconOnly variant="flat" onPress={() => calendarStore.setCurrentYearMonth(calendarStore.currentYearMonth.subtract(1, "month"))}>
            <Icon name={"Back"} size={24} />
          </Button>
          <Button isIconOnly variant="flat" onPress={() => calendarStore.setCurrentYearMonth(calendarStore.currentYearMonth.add(1, "month"))}>
            <Icon name={"Forward"} size={24} />
          </Button>
        </div>
      </div>
      {/* 年月ピッカー ここまで */}

      {/* カレンダー ここから */}
      <div className="rounded-md shadow w-full lg:w-1/3">
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
                className={`flex flex-col h-10 mx-auto justify-center min-w-full rounded-md ${calendarStore.selectedDate === summary.date ? "bg-blue-100 shadow-sm" : ""}`}
                key={summary.id}
                onClick={() => onDateClick(summary.date)}
              >
                <div className={`top h-5 w-full text-sm text-center ${isToday(summary.date) ? "text-red-400" : ""}`}>
                  {summary.label}
                </div>
                {summary.tag === "overview" && (
                  <div className="bottom flex-grow h-7 py-1 w-full cursor-pointer text-center">
                    <div className="text-xs text-gray-500">{summary.amount > 0 ? summary.amount.toLocaleString() : ""}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* カレンダー ここまで */}
    </div>
  )
};
