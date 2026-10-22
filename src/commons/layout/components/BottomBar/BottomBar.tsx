import Link from "next/link";

const text = "text-[13px] text-foreground italic font-semibold font-dm-sans";

//TODO:Link先の設定
const BottomBar = () => {
  return (
    <div className="flex w-fit gap-8 rounded-[40px] border border-[#FFFFFF25] bg-[#ffffff0a] px-7 py-3">
      <Link href="/">
        <span className={text}>Todo</span>
      </Link>
      <Link href="/Calendar">
        <span className={text}>Calendar</span>
      </Link>
      <Link href="/Board">
        <span className={text}>Board</span>
      </Link>
    </div>
  );
};

export default BottomBar;
