import Link from "next/link";

const text = "text-[13px] text-foreground italic font-semibold font-dm-sans";

//TODO:Link先の設定
const BottomBar = () => {
  return (
    <div className="gap-8 flex bg-[#ffffff0a] rounded-[40px] py-3 px-7 w-fit border-[#FFFFFF25] border">
      <Link href="./">
        <span className={text}>Todo</span>
      </Link>
      <Link href="./">
        <span className={text}>Calendar</span>
      </Link>
      <Link href="./">
        <span className={text}>Board</span>
      </Link>
    </div>
  );
};

export default BottomBar;
