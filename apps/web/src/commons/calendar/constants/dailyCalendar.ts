/* DailyCalendar の寸法・時間の定数 */

/* 高さを測るまでの 1 時間あたりの高さ（px）。測ったあとはカレンダーの高さに 1 日分を収める */
export const DEFAULT_HOUR_HEIGHT = 32;
/* 0:00 の線より上・24:00 の線より下の余白（px） */
export const PADDING_TOP = 24;
export const PADDING_BOTTOM = 8;
/* これより低い予定は、時刻とタイトルを横に並べる */
export const STACK_MIN_HEIGHT = 40;
export const MIN_EVENT_HEIGHT = 16;
/* text-xs の時刻ラベル 1 行の高さ（px） */
export const LABEL_HEIGHT = 16;
export const MINUTE_MS = 60 * 1000;
export const TZ = "Asia/Tokyo";
/* ドラッグで選ぶ時間帯の刻み（分）。クリック・タップだけならこの長さで選ぶ */
export const SNAP_MINUTES = 15;
/* タップとみなす指の移動量の上限（px）。これより動いたらスクロールとみなす */
export const TAP_TOLERANCE = 8;
