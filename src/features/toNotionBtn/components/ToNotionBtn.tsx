import Image from "next/image";
import Link from "next/link";
type Props = {
  url: string;
  size: number;
};

const ToNotionBtn = ({ url, size }: Props) => {
  return (
    <>
      <Link href={url}>
        <Image
          src="junpURL.svg"
          alt="go to notion"
          width={size}
          height={size}
        />
      </Link>
    </>
  );
};

export default ToNotionBtn;
