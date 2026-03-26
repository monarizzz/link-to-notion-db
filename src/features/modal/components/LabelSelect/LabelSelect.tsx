import CommonSelect from "@/commons/layout/components/CommonSelect/CommonSelect";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  labels: string[];
  placeholder: string;
  selectLabel: string;
};

const LabelSelect = ({ labels, placeholder, selectLabel }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="label"
      render={({ field: { value, onChange } }) => (
        <CommonSelect
          labels={labels}
          placeholder={placeholder}
          selectLabel={selectLabel}
          form={{ value, onChange }}
        />
      )}
    />
  );
};

export default LabelSelect;
