import { useFormContext, useWatch } from "react-hook-form";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";
import dayjs, { ManipulateType } from "dayjs";
import "@/libs/dayjs/config";

type Props = {
  name: "start" | "end";
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const DateTimePicker = ({ name }: Props) => {
  const { setValue, trigger } = useFormContext();
  const value = useWatch({ name });
  const date = dayjs(value);

  const shift = (amount: number, unit: ManipulateType) => {
    setValue(name, date.add(amount, unit).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
    // 前後関係のエラーは end に付くため、start を変えたときも end を検証し直す
    trigger("end");
  };

  const columns = [
    { unit: "hour", label: "時", value: date.format("HH") },
    { unit: "minute", label: "分", value: date.format("mm") },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-center gap-4 p-3">
        <button
          type="button"
          aria-label="前の日"
          className="cursor-pointer"
          onClick={() => shift(-1, "day")}
        >
          <ChevronLeftIcon className="size-4 text-primary-foreground" />
        </button>
        <span className="text-[14px] font-medium text-foreground">
          {date.format("M月 D日")} ({WEEKDAYS[date.day()]})
        </span>
        <button
          type="button"
          aria-label="次の日"
          className="cursor-pointer"
          onClick={() => shift(1, "day")}
        >
          <ChevronRightIcon className="size-4 text-primary-foreground" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-6 px-3 pt-2 pb-4">
        {columns.map((column, i) => (
          <div key={column.unit} className="flex items-center gap-6">
            {i > 0 && (
              <span className="text-[24px] font-light text-primary-foreground">
                :
              </span>
            )}
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                aria-label={`${column.label}を減らす`}
                className="cursor-pointer"
                onClick={() => shift(-1, column.unit)}
              >
                <ChevronUpIcon className="size-5 text-[#4A79F5]" />
              </button>
              <span className="text-[28px] font-bold text-foreground">
                {column.value}
              </span>
              <button
                type="button"
                aria-label={`${column.label}を増やす`}
                className="cursor-pointer"
                onClick={() => shift(1, column.unit)}
              >
                <ChevronDownIcon className="size-5 text-[#4A79F5]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateTimePicker;
