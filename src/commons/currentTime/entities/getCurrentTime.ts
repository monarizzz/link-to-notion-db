import dayjs from "dayjs";

export const getCurrentTime = () => {
  return dayjs().tz("Asia/Tokyo").format("HH:mm");
};
