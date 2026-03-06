import { calcBgColor, calcDate, calcTextColor } from "./utils/DateLabel.utils";

type Props = {
  date: Date;
};

const DateLabel = ({ date }: Props) => {
  return (
    <div className={`${calcBgColor(date)} flex rounded-[30px] items-center`}>
      <span
        className={`text-2xs py-0.5 px-2 font-bold  ${calcTextColor(date)}`}
      >
        {calcDate(date)}
      </span>
    </div>
  );
};

export default DateLabel;
