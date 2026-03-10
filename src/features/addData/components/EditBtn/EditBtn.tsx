import Image from "next/image";

type Props = {
  onClick: () => void;
};

const EditBtn = ({ onClick }: Props) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <Image
        src="/pen.svg"
        alt="pen"
        width={10}
        height={10}
        className="pb-0.5 cursor-pointer"
      />
    </button>
  );
};

export default EditBtn;
