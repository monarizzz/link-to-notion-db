import dayjs from "dayjs";
import "@/libs/dayjs/config";

export const getCurrentTime = () => {
  return dayjs().format("HH:mm");
};
