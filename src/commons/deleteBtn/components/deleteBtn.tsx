"use client";
import Image from "next/image";
import recordDel from "../utils/recordDel";

type Props = {
  size: number;
  pageId: string;
};

const DeleteBtn = ({ size, pageId }: Props) => {
  const handleClick = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    await recordDel(pageId);
  };

  return (
    <button onClick={handleClick}>
      <Image src="/delete-btn.svg" alt="delete" width={size} height={size} />
    </button>
  );
};

export default DeleteBtn;
