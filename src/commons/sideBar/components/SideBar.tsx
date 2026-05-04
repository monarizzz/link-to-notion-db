import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";
import { ToRecord } from "@/features/notion/types/toRecord";

type Props = {
  event: ToRecord[];
};

const SideBar = ({ event }: Props) => {
  console.log(event);
  return (
    <div className="text-[34px] bg-[#ffffff0a] border-t border-r border-b border-[#ffffff25] py-5 px-7 gap-5 rounded-r-3xl min-w-[22vh] min-h-[45vw]">
      <div>
        <span className="text-primary-foreground text-2xs font-semibold leading-0.5">
          TODAY
        </span>
        {/* <CurrentDate
          color={"var(--foreground)"}
          fontSizeProps={"18px"}
          letterSpacingProps={"0px"}
          bold
          format="M月 D日"
        /> */}
        <span className="text-foreground"></span>
      </div>
      <div className="p-2.5">
        <CommonSeparator />
      </div>
      <div>
        <span className="text-primary-foreground text-2xs">作業時間</span>
        <div className="text-[34px] -tracking-[1px] font-bold text-foreground">
          {/* {total} */}
          {/* TODO:トータルの時間にする */}
        </div>
        <div className="p-2.5">
          <CommonSeparator />
        </div>
      </div>
      <div>
        <span className="text-primary-foreground text-2xs font-semibold leading-0.5">
          {/* {todo} */}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
