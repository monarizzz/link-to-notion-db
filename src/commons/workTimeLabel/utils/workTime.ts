import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const workTime = (start: string, end: string) => {
  const diff = dayjs(end).diff(dayjs(start));
  return dayjs.duration(diff).format("H時間 mm分");
};

export default workTime;
