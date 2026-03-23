import { useWatch } from "react-hook-form";
import Pen from "@public/pen.svg";

import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { Fragment } from "react";

const ModalContents = () => {
  const [start, end, label] = useWatch({
    name: ["start", "end", "label"],
  });

  const contents = [
    { name: "分類", detail: label },
    { name: "開始時間", detail: dayjs(start).format("MM/DD HH:mm") },
    { name: "終了時間", detail: dayjs(end).format("MM/DD HH:mm") },
  ];

  return (
    <div>
      {contents.map((content) => (
        <Fragment key={content.name}>
          <div className="flex py-2.5 justify-between text-[14px]">
            <div className="text-[#8A8A8E]">{content.name}</div>
            <div className="flex gap-2">
              <span className="text-[#F5F5F5]">{content.detail}</span>
              <button type="submit">
                {/* あとで編集ボタンを追加する */}
                <Pen className="size-4 text-[#4A79F5]" />
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ModalContents;
