import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CurrentTime from "@/commons/date/components/CurrentTime/CurrentTime";

const NowDisplay = () => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <CurrentTime />
      <CurrentDate
        color="var(--primary-foreground)"
        fontSizeProps={"14px"}
        letterSpacingProps={"2px"}
        format="YYYY.MM.DD"
        home={true}
      />
    </div>
  );
};

export default NowDisplay;
