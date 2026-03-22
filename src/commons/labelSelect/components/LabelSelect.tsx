import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/libs/shadcn/assets/ui/select";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  labels: string[];
  placeholder: string;
  selectLabel: string;
};

//TODO:style修正
const LabelSelect = ({ labels, placeholder, selectLabel }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="label"
      render={({ field: { value, onChange } }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-[#252525] w-full text-xs border-none text-[#FAFAF9] focus-visible:ring-[1px] h-auto py-0 px-2.5">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-[#252525] text-[#FAFAF9] text-xs">
            <SelectGroup>
              <SelectLabel>{selectLabel}</SelectLabel>
              {labels.map((label) => (
                <SelectItem className="text-xs" key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default LabelSelect;
