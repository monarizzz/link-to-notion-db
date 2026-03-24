"use client";
import Image from "next/image";
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
      <Image src="/delete-btn.svg" alt="delete" width={size} height={size} />
    </button>
  );
};

export default DeleteBtn;
