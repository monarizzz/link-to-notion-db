import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/libs/shadcn/assets/lib/utils";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
};

const LabelChips = ({ labels }: Props) => {
  const { control } = useFormContext();

  if (labels.length === 0) {
    return (
      <p className="px-3 pt-2.5 pb-3 text-[13px] text-primary-foreground">
        ラベルがありません
      </p>
    );
  }

  return (
    <Controller
      control={control}
      name="label"
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-wrap gap-2 px-3 pt-2.5 pb-3">
          {labels.map((label) => {
            const isSelected = label.name === value;
            return (
              <button
                type="button"
                key={label.id}
                aria-pressed={isSelected}
                onClick={() => onChange(label.name)}
                className={cn(
                  "cursor-pointer rounded-[20px] px-3.5 py-2 text-[13px]",
                  isSelected
                    ? "bg-[#4A79F5] font-semibold text-white"
                    : "bg-[#3A3A3C] text-foreground",
                )}
              >
                {label.name}
              </button>
            );
          })}
        </div>
      )}
    />
  );
};

export default LabelChips;
