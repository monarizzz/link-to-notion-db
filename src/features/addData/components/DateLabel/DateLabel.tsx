import { calcDayDiff } from "../../entities/calcDayDiff";
import { calcDateLabelStyle } from "../../utils/DateLabel.utils";

type Props = {
  date: Date;
};

const DateLabel = ({ date }: Props) => {
  const diff = calcDayDiff(date);
  const { bgColor, textColor, label } = calcDateLabelStyle(diff);
  return (
    <div className={`${bgColor} flex rounded-[30px] items-center`}>
      <span className={`text-2xs py-0.5 px-2 font-bold  ${textColor}`}>
        {label}
      </span>
    </div>
  );
};

export default DateLabel;
