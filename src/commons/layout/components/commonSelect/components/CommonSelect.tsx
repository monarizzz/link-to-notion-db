import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/libs/shadcn/assets/ui/select";

type Props = {
  labels: string[];
  placeholder: string;
  selectLabel: string;
  form?: {
    value: string;
    onChange: (value: string) => void;
  };
};

//TODO:style修正
const CommonSelect = ({ labels, selectLabel, placeholder, form }: Props) => {
  const selectProps = form
    ? { value: form.value ?? "", onValueChange: form.onChange }
    : {};
  return (
    <Select {...selectProps}>
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
  );
};

export default CommonSelect;
