import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";

const SideBar = () => {
  return (
    <div className="text-[34px] bg-[#ffffff0a] stroke-[#ffffff25]">
      <CurrentDate
        color={"foreground"}
        fontSizeProps={"18px"}
        letterSpacingProps={"0px"}
        format="M月 D日"
      />
    </div>
  );
};

export default SideBar;
