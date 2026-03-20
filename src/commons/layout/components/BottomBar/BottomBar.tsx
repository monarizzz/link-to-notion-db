import Link from "next/link";

const text = "text-[13px] text-[#FAFAF9] italic font-semibold font-dm-sans";

//TODO:Link先の設定
const BottomBar = () => {
  return (
    <div className="gap-8 flex bg-[#ffffff0a] rounded-[40px] py-3 px-7 w-fit border-[#FFFFFF25] border">
      <Link href="./">
        <p className={text}>Todo</p>
      </Link>
      <Link href="./">
        <p className={text}>Calendar</p>
      </Link>
      <Link href="./">
        <p className={text}>Board</p>
      </Link>
    </div>
  );
};

export default BottomBar;
