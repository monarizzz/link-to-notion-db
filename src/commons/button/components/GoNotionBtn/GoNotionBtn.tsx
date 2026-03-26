import JumpURL from "@public/button/jumpURL.svg";
import Link from "next/link";
type Props = {
  url: string;
  size: number;
};

const GoNotionBtn = ({ url, size }: Props) => {
  return (
    <Link href={url}>
      <JumpURL
        alt="go to notion"
        width={size}
        height={size}
        className="text-[#1C274C]"
      />
    </Link>
  );
};

export default GoNotionBtn;
