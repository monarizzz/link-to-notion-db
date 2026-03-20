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

const LabelSelect = ({ labels, placeholder, selectLabel }: Props) => {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {labels.map((label) => (
            <SelectItem key={label} value={label}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LabelSelect;
