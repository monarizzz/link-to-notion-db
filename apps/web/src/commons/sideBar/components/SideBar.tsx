import { CalendarEvent } from "@/commons/calendar/types/calendarEvent";
import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";
import { getTime } from "date-fns";

type Props = {
  today: CalendarEvent[];
  /* 集計する範囲（エポックミリ秒、to は含まない）。範囲の外にはみ出した分は数えない */
  range: { from: number; to: number };
};

const SideBar = ({ today, range }: Props) => {
  const eventsWithTotal = today.map((events) => {
    const start = Math.max(getTime(new Date(events.start)), range.from);
    const end = Math.min(getTime(new Date(events.end)), range.to);

    const total =
      Math.round((Math.max(end - start, 0) / (60 * 60 * 1000)) * 100) / 100;
    return { ...events, total };
  });

  const dayWorkTimeTotalHours = eventsWithTotal.reduce(
    (acc, event) => acc + event.total,
    0,
  );
  const dayWorkHours = Math.floor(dayWorkTimeTotalHours);
  const dayWorkMinutes = Math.round(
    (dayWorkTimeTotalHours - dayWorkHours) * 60,
  );
  return (
    <div className="min-h-[70vh] min-w-[15vw] gap-5 rounded-r-3xl border-t border-r border-b border-[#ffffff25] bg-[#ffffff0a] px-7 py-5 text-[34px]">
      <span className="text-2xs leading-0.5 font-semibold text-primary-foreground">
        DATE
      </span>
      <CurrentDate
        color={"var(--foreground)"}
        fontSizeProps={"18px"}
        letterSpacingProps={"0px"}
        bold
        format="M月 D日"
      />
      <div className="p-2.5">
        <CommonSeparator />
      </div>
      <div>
        <span className="text-2xs text-primary-foreground">作業時間</span>
        <div className="text-[34px] font-bold -tracking-[1px] text-foreground">
          {dayWorkHours !== 0 ? <span>{dayWorkHours}h </span> : null}
          <span> {dayWorkMinutes}m</span>
        </div>
        <div className="p-2.5">
          <CommonSeparator />
        </div>
      </div>
      <div>
        <span className="text-2xs leading-0.5 font-semibold text-primary-foreground">
          {/* {todo} */}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
