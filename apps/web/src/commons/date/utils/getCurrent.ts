import dayjs from "dayjs";
import "@/libs/dayjs/config";

export const getCurrent = (format: string) => {
  return dayjs().format(format);
};
