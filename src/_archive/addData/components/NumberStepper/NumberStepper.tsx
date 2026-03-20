import { AddDataForm } from "@/commons/addData/components/AddData";
import { Button } from "@/libs/shadcn/assets/ui/button";
import { ButtonGroup } from "@/libs/shadcn/assets/ui/button-group";
import { Input } from "@/libs/shadcn/assets/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: "hTotal" | "mTotal";
  defaultValue: number;
  max?: number;
};

const NumberStepper = ({ name, defaultValue, max }: Props) => {
  const { control } = useFormContext<AddDataForm>();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <ButtonGroup
          orientation="horizontal"
          aria-label="Number input"
          className="h-fit border border-input rounded-md overflow-hidden bg-background"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="減らす"
            onClick={() => (value > 0 ? onChange(value - 1) : value)}
            className="text-muted-foreground"
          >
            <MinusIcon />
          </Button>
          <Input
            type="number"
            inputMode="numeric"
            value={value}
            onChange={(e) => onChange(e.target.valueAsNumber)}
            className="font-dm-mono text-[13px]
              w-6.5 h-7.5 flex-none px-0 text-center border-none shadow-none focus-visible:ring-0 focus-visible:border-transparent hover:bg-background-2
              [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="増やす"
            onClick={() =>
              max !== undefined && value >= max ? value : onChange(value + 1)
            }
            className="text-muted-foreground"
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
      )}
    />
  );
};

export default NumberStepper;
