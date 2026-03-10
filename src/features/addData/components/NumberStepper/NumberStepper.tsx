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
      className="h-fit border border-input rounded-md overflow-hidden bg-background"
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
        // 修正案: 範囲チェックを追加
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val) && val >= 0 && (max === undefined || val <= max)) {
            setCount(val);
          }
        }}
        min={0}
        max={max}
        className="font-dm-mono w-6.5 h-7.5 flex-none px-0 text-center border-none shadow-none focus-visible:ring-0 focus-visible:border-transparent hover:bg-background-2"
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
