import { CalendarStore } from "@type/calendar";
import dayjs from "dayjs";
import { create } from "zustand";

const definition = (
  set: (
    partial:
      | CalendarStore
      | Partial<CalendarStore>
      | ((state: CalendarStore) => CalendarStore | Partial<CalendarStore>),
    replace?: boolean | undefined
  ) => void,
  get: () => CalendarStore
) => ({
  isInit: true,
  start: dayjs().startOf("month").format("YYYY-MM-DD"),
  end: dayjs().endOf("month").format("YYYY-MM-DD"),
  currentYearMonth: dayjs(),
  selectedYear: parseInt(dayjs().format("YYYY")),
  selectedMonth: parseInt(dayjs().format("M")),
  selectedDate: dayjs().format("YYYY-MM-DD"),
  isYearMonthPickerOpen: false,
  setIsInit: (boolean) => set({
    isInit: boolean,
  }),
  setStart: (date) => set({
    start: date,
  }),
  setEnd: (date) => set({
    end: date,
  }),
  setCurrentYearMonth: (date) => {
    set({
      // 主作用
      currentYearMonth: date,

      // 副作用
      start: date.startOf("month").format("YYYY-MM-DD"),
      end: date.endOf("month").format("YYYY-MM-DD"),
      selectedYear: parseInt(date.format("YYYY")),
      selectedMonth: parseInt(date.format("M")),
    });
  },
  increaseYear: () => set((state) => ({
    // 主作用
    selectedYear: state.selectedYear + 1,
  })),
  decreaseYear: () => set((state) => ({
    // 主作用
    selectedYear: state.selectedYear - 1,
  })),
  setSelectedMonth: (month) => set((state) => ({
    // 主作用
    selectedMonth: month,

    // 副作用
    currentYearMonth: dayjs(`${state.selectedYear}-${month}-01`),
    start: dayjs(`${state.selectedYear}-${month}-01`).startOf("month").format("YYYY-MM-DD"),
    end: dayjs(`${state.selectedYear}-${month}-01`).endOf("month").format("YYYY-MM-DD"),
  })),
  toggleIsYearMonthPickerOpen: () => set((state) => ({
    isYearMonthPickerOpen: !state.isYearMonthPickerOpen,
  })),
  setSelectedDate: (date) => set({
    selectedDate: date,
  }),
} as CalendarStore);

export const useOverviewCalendar = create<CalendarStore>(definition);
export const useDatePickerCalendar = create<CalendarStore>(definition);
