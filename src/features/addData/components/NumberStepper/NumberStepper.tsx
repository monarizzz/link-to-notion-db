import { Button } from "@/libs/shadcn/assets/ui/button";
import { ButtonGroup } from "@/libs/shadcn/assets/ui/button-group";
import { Input } from "@/libs/shadcn/assets/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  defaultValue: number;
  max?: number;
  digits?: number;
};

const NumberStepper = ({ defaultValue, max, digits }: Props) => {
  const [count, setCount] = useState(defaultValue);

  return (
    <ButtonGroup
      orientation="horizontal"
      aria-label="Media controls"
      className="h-fit border border-input rounded-md overflow-hidden"
    >
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => setCount((c) => (c > 0 ? c - 1 : c))}
        className="text-muted-foreground"
      >
        <MinusIcon />
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        value={String(count).padStart(digits ?? 1, "0")}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val)) setCount(val);
        }}
        min={0}
        max={max}
        className="font-dm-mono w-6.5 h-7.5 px-0 text-center border-none shadow-none focus-visible:ring-0 focus-visible:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:bg-background-2"
      />
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() =>
          setCount((c) => (max !== undefined && c > max - 1 ? c : c + 1))
        }
        className="text-muted-foreground"
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default NumberStepper;
