import { Transaction } from "@frontend/types/entities/transaction";
import dayjs from "dayjs";

export type DayLabel = {
  key: string;
  label: string;
};

export type Summary = Overview | DatePicker;

type Overview = {
  tag: "overview";
  id: number;
  label: string;
  date: string;
  amount: number;
};

type DatePicker = {
  tag: "date_picker";
  id: number;
  label: string;
  date: string;
};

export type CalendarStore = {
  transactions: Transaction[] | null;
  isInit: boolean;
  start: string;
  end: string;
  currentYearMonth: dayjs.Dayjs;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: string;
  isYearMonthPickerOpen: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  setIsInit: (boolean: boolean) => void;
  setStart: (date: string) => void;
  setEnd: (date: string) => void;
  setCurrentYearMonth: (date: dayjs.Dayjs) => void;
  increaseYear: () => void;
  decreaseYear: () => void;
  setSelectedMonth: (month: number) => void;
  toggleIsYearMonthPickerOpen: () => void;
  setSelectedDate: (date: string) => void;
};
