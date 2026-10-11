export type DayHours = {
  day: string;
  open: string;
  close: string;
};

export const SHOP_ADDRESS = "123 Sukhumvit Rd, Bangkok";

export const weeklyHours: DayHours[] = [
  { day: "Monday", open: "07:00", close: "18:00" },
  { day: "Tuesday", open: "07:00", close: "18:00" },
  { day: "Wednesday", open: "07:00", close: "18:00" },
  { day: "Thursday", open: "07:00", close: "18:00" },
  { day: "Friday", open: "07:00", close: "18:00" },
  { day: "Saturday", open: "08:00", close: "17:00" },
  { day: "Sunday", open: "08:00", close: "17:00" },
];

export function formatHoursRange(open: string, close: string): string {
  return `${open}–${close}`;
}
