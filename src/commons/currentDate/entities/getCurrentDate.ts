import dayjs from "dayjs";
import "@/libs/dayjs/config";

export const getCurrentDate = () => {
  return dayjs().tz("Asia/Tokyo").format("YYYY.MM.DD");
};
