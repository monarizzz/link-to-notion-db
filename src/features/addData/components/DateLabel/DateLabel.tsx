import { calcDayDiff } from "./entities/calcDayDiff";
import { calcBgColor, calcDate, calcTextColor } from "./utils/DateLabel.utils";

type Props = {
  date: Date;
};

const DateLabel = ({ date }: Props) => {
  const diff = calcDayDiff(date);
  return (
    <div className={`${calcBgColor(diff)} flex rounded-[30px] items-center`}>
      <span
        className={`text-2xs py-0.5 px-2 font-bold  ${calcTextColor(diff)}`}
      >
        {calcDate(diff)}
      </span>
    </div>
  );
};

export default DateLabel;
