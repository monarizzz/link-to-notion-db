type Props = {
  date: Date;
};

const DateDisplay = ({ date }: Props) => {
  //TODO: 今日の場合のラベルを追加する
  const year = date.getFullYear();
  const month = " " + String(date.getMonth() + 1);
  const day = " " + String(date.getDate());
  const weekday = date.toLocaleDateString("ja-JP", { weekday: "short" });

  return (
    <div className="w-full">
      <div className="font-dm-sans text-sm">
        {`${year}年${month}月${day}日（${weekday}）`}
      </div>
    </div>
  );
};

export default DateDisplay;
