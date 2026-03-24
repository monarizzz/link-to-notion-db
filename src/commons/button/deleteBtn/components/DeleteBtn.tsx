"use client";
import DustBox from "@public/button/dustBox.svg";
import pageDel from "../utils/pageDel";

type Props = {
  size: number;
  pageId: string;
};

const DeleteBtn = ({ size, pageId }: Props) => {
  const handleClick = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    await pageDel(pageId);
  };

  return (
    <button onClick={handleClick}>
      <DustBox alt="delete" className={`text-[#1C274C] size-${size}`} />
    </button>
  );
};

export default DeleteBtn;
