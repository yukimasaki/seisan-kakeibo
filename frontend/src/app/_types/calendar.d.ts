import dayjs from "dayjs";

export type DayLabel = {
  key: string;
  label: string;
};

export type Summary = {
  id: number;
  label: string;
  date: string;
  amount: number;
};
