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
};

//TODO:style修正 py-0 px-2.5
const LabelSelect = ({ labels, placeholder, selectLabel }: Props) => {
  return (
    <Select>
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

export default LabelSelect;
