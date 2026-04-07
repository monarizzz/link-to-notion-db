import { useWatch } from "react-hook-form";
import Pen from "@public/pen.svg";

import dayjs from "dayjs";
import "@/libs/dayjs/config";

const ModalContents = () => {
  const [start, end, label] = useWatch({
    name: ["start", "end", "label"],
  });

  const contents = [
    { name: "分類", detail: label ? label : "---" },
    { name: "開始時間", detail: dayjs(start).format("MM/DD HH:mm") },
    { name: "終了時間", detail: dayjs(end).format("MM/DD HH:mm") },
  ];

  return (
    <div>
      {contents.map((content) => (
        <div
          className="flex py-2.5 justify-between text-[14px]"
          key={content.name}
        >
          <div className="text-primary-foreground">{content.name}</div>
          <div className="flex gap-2">
            <span className="text-foreground">{content.detail}</span>
            <button type="button">
              {/* あとで編集ボタンを追加する */}
              <Pen className="size-4 text-[#4A79F5]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModalContents;
