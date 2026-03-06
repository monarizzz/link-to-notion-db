type Props = {
  date: Date;
};

const DateDisplay = ({ date }: Props) => {
  //TODO: 今日の場合のラベルを追加する
  return (
    <div className="w-full">
      <div className="font-dm-sans text-sm">
        {date
          ?.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })
          .replace("(", "（")
          .replace(")", "）")}
      </div>
    </div>
  );
};

export default DateDisplay;
