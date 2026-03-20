import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentDate = () => {
  return dayjs().tz("Asia/Tokyo").format("YYYY.MM.DD");
};
