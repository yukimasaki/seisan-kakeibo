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
