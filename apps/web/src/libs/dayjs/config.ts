import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

/* フォームで扱う日時の形式。API へもこの形で送る */
export const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ";
