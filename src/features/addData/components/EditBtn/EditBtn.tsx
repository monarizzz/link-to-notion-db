import Image from "next/image";

type Props = {
  onClick: () => void;
};

const EditBtn = ({ onClick }: Props) => {
  return (
    <Image
      src="/pen.svg"
      alt="pen"
      width={10}
      height={10}
      className="pb-0.5 cursor-pointer"
      onClick={onClick}
    />
  );
};

export default EditBtn;
