import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentTime = () => {
  return dayjs().tz("Asia/Tokyo").format("HH:mm");
};
