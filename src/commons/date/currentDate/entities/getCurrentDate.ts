import dayjs from "dayjs";
import "@/libs/dayjs/config";

export const getCurrentDate = () => {
  return dayjs().format("YYYY.MM.DD");
};
