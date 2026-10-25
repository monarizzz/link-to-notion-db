import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CurrentTime from "@/commons/date/components/CurrentTime/CurrentTime";

const NowDisplay = () => {
  return (
    <div className="flex flex-col items-center gap-2">
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
