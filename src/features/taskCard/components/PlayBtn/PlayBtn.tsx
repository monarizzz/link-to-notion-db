import Image from "next/image";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const PlayBtn = () => {
  return (
    <button
      className="bg-[#c2ef53ff] shadow-[0_0_12px_rgba(194,239,83,0.2)] p-3 rounded-3xl"
      onClick={() =>
        console.log(dayjs().tz("Asia/Tokyo").format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
      }
    >
      <Image src="/play.svg" width={16} height={16} alt="play" />
      {/* {time} */}
    </button>
  );
};

export default PlayBtn;
