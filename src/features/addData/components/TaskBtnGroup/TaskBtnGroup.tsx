import { Controller, useFormContext } from "react-hook-form";
import type { AddDataForm } from "@/commons/addData/components/AddData";
import TaskBtn from "../TaskBtn/TaskBtn";

type Props = {
  labels: string[];
};

const TaskBtnGroup = ({ labels }: Props) => {
  const { control } = useFormContext<AddDataForm>();
  return (
    <Controller
      control={control}
      name="label"
      render={({ field: { onChange, value } }) => (
        <>
          {labels.map((label) => (
            <TaskBtn
              key={label}
              label={label}
              setLabel={value === label}
              onClick={() => onChange(label)}
            />
          ))}
        </>
      )}
    />
  );
};

export default TaskBtnGroup;
