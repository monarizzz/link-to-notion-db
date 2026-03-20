import dayjs from "dayjs";

export const getCurrentDate = () => {
  return dayjs().tz("Asia/Tokyo").format("YYYY.MM.DD");
};
