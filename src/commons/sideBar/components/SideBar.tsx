import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";
import { getTime } from "date-fns";

type Props = {
  today: NotionEvent[];
};

const SideBar = ({ today }: Props) => {
  // TODO: NotionEvent の start/end が SDK の型都合で optional になっている。本来は必須のため型を見直す
  const eventsWithTotal = today
    .filter((e) => e.start && e.end)
    .map((events) => {
      const start = new Date(events.start!);
      const end = new Date(events.end!);

      const total =
        Math.round(((getTime(end) - getTime(start)) / (60 * 60 * 1000)) * 100) /
        100;
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
    <div className="text-[34px] bg-[#ffffff0a] border-t border-r border-b border-[#ffffff25] py-5 px-7 gap-5 rounded-r-3xl min-w-[15vw] min-h-[70vh]">
      <span className="text-primary-foreground text-2xs font-semibold leading-0.5">
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
        <span className="text-primary-foreground text-2xs">作業時間</span>
        <div className="text-[34px] -tracking-[1px] font-bold text-foreground">
          {dayWorkHours != 0 ? <span>{dayWorkHours}h </span> : null}
          <span> {dayWorkMinutes}m</span>
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
