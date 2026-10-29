import { useState } from "react";
import { useWatch } from "react-hook-form";
import { CheckIcon } from "lucide-react";
import Pen from "@public/pen.svg";
import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";
import LabelChips from "@/commons/modal/components/LabelChips/LabelChips";
import DateTimePicker from "@/commons/modal/components/DateTimePicker/DateTimePicker";
import { cn } from "@/libs/shadcn/assets/lib/utils";

import dayjs from "dayjs";
import "@/libs/dayjs/config";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
};

type Field = "label" | "start" | "end";

const ModalContents = ({ labels }: Props) => {
  const [start, end, label] = useWatch({
    name: ["start", "end", "label"],
  });
  const [editing, setEditing] = useState<Field | null>(null);

  const contents: {
    field: Field;
    name: string;
    detail: string;
    editor: React.ReactNode;
  }[] = [
    {
      field: "label",
      name: "分類",
      detail: labels.find(({ id }) => id === label)?.name ?? "---",
      editor: <LabelChips labels={labels} />,
    },
    {
      field: "start",
      name: "開始時間",
      detail: dayjs(start).format("MM/DD HH:mm"),
      editor: <DateTimePicker name="start" />,
    },
    {
      field: "end",
      name: "終了時間",
      detail: dayjs(end).format("MM/DD HH:mm"),
      editor: <DateTimePicker name="end" />,
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {contents.map((content) => {
        const isEditing = editing === content.field;
        return (
          <div
            key={content.field}
            className={cn(isEditing && "rounded-[10px] bg-[#1C1C1E]")}
          >
            <div
              className={cn(
                "flex justify-between py-2.5 text-[14px]",
                isEditing && "px-3",
              )}
            >
              <div className="text-primary-foreground">{content.name}</div>
              <div className="flex gap-2">
                <span className="text-foreground">{content.detail}</span>
                <button
                  type="button"
                  aria-label={`${content.name}を${isEditing ? "確定" : "編集"}`}
                  aria-expanded={isEditing}
                  className="cursor-pointer"
                  onClick={() => setEditing(isEditing ? null : content.field)}
                >
                  {isEditing ? (
                    <CheckIcon className="size-4 text-[#4A79F5]" />
                  ) : (
                    <Pen className="size-4 text-[#4A79F5]" />
                  )}
                </button>
              </div>
            </div>
            {isEditing && (
              <>
                <CommonSeparator />
                {content.editor}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModalContents;
