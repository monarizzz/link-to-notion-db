import dayjs from "dayjs";
import "@/libs/dayjs/config";

export const getCurrentTime = () => {
  return dayjs().tz("Asia/Tokyo").format("HH:mm");
};
