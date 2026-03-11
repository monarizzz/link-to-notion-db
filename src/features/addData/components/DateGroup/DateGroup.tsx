import CalendarPicker from "@/features/addData/components/CalendarPicker/CalendarPicker";
import DateDisplay from "@/features/addData/components/DateDisplay/DateDisplay";
import { Separator } from "@/libs/shadcn/assets/ui/separator";
import DateLabel from "../DateLabel/DateLabel";
import type { AddDataForm } from "@/commons/addData/components/AddData";
import { Controller, useFormContext } from "react-hook-form";

const DateGroup = () => {
  const { control } = useFormContext<AddDataForm>();
  const dateObj = new Date();
  return (
    <Controller
      control={control}
      name="sDate"
      render={({ field: { onChange } }) => (
        <div className="w-fit!">
          <div className="mb-3">
            <div className="ml-1">
              <DateDisplay date={dateObj} />
            </div>
            <div className="my-1.5 ml-0.5">
              <DateLabel date={dateObj} />
            </div>
          </div>
          <Separator className="mb-2" />
          <CalendarPicker date={dateObj} setDate={onChange} />
        </div>
      )}
    />
  );
};

export default DateGroup;
