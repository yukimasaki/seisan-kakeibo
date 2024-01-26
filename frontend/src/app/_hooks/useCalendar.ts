import dayjs from "dayjs";
import { create } from "zustand";

export type CalendarStore = {
  isInit: boolean;
  start: string;
  end: string;
  setIsInit: (
    boolean: boolean,
  ) => void;
  setStart: (
    date: string,
  ) => void;
  setEnd: (
    date: string,
  ) => void;
};

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
  setIsInit: (boolean) => set({
    isInit: boolean,
  }),
  setStart: (date) => set({
    start: date,
  }),
  setEnd: (date) => set({
    end: date,
  }),
} as CalendarStore);

export const useOverviewCalendar = create<CalendarStore>(definition);
export const useDatePickerCalendar = create<CalendarStore>(definition);
