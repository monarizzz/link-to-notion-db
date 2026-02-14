import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const workTime = (start: string, end: string) => {
  const d = dayjs.duration(dayjs(end).diff(dayjs(start)));
  const hours = Math.floor(d.asHours());
  return hours > 0 ? `${hours}時間 ${d.format("mm")}分` : `${d.format("m")}分`;
};

export default workTime;
