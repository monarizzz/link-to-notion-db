import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";

const SideBar = () => {
  return (
    <div className="mix text-[34px] bg-[#ffffff0a] border-t border-r border-b border-[#ffffff25] py-5 px-7 gap-5 rounded-r-3xl min-w-[22vh] min-h-[70vh]">
      <div>
        <span className="text-primary-foreground text-2xs font-semibold leading-0.5">
          TODAY
        </span>
        <CurrentDate
          color={"foreground"}
          fontSizeProps={"18px"}
          letterSpacingProps={"0px"}
          bold
          format="M月 D日"
        />
      </div>
      <div className="p-2.5">
        <CommonSeparator />
      </div>
      <div>
        <span className="text-primary-foreground text-2xs">作業時間</span>
        <div className="text-[34px] -tracking-[1px] font-bold text-foreground">
          5h 20m
          {/* TODO:トータルの時間にする */}
        </div>
        <div className="p-2.5">
          <CommonSeparator />
        </div>
      </div>
      <div>
        <span className="text-primary-foreground text-2xs font-semibold leading-0.5">
          TODO
        </span>
      </div>
    </div>
  );
};

export default SideBar;
