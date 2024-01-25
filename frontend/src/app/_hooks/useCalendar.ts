import dayjs from "dayjs";
import { create } from "zustand";

type CalendarStore = {
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

export const useCalendar = create<CalendarStore>((set) => ({
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
}));
