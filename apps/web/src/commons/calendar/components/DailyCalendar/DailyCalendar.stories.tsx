import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, fn } from "storybook/test";

import DailyCalendar from "./DailyCalendar";

/* 2026-11-28 0:00 (JST) */
const from = Date.parse("2026-11-28T00:00:00+09:00");
const range = { from, to: from + 24 * 60 * 60 * 1000 };

const record = (
  id: string,
  title: string | null,
  start: string,
  end: string,
  color?: string,
) => ({
  id,
  title,
  started_at: `2026-11-28T${start}:00+09:00`,
  ended_at: `2026-11-28T${end}:00+09:00`,
  created_at: "2026-11-28T00:00:00.000Z",
  updated_at: "2026-11-28T00:00:00.000Z",
  labels: color ? [{ id: `label-${id}`, name: "ラベル", color }] : [],
});

const meta = {
  component: DailyCalendar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    range,
    now: Date.parse("2026-11-28T19:48:00+09:00"),
    records: [
      record("1", "履修登録", "09:00", "10:00", "#5A9EEF"),
      record("2", "UIデザインの修正", "10:30", "11:30"),
      record("3", "コードレビュー", "13:00", "14:00", "#FFB547"),
      record("4", "面接準備", "16:00", "16:05", "#32D583"),
    ],
  },
} satisfies Meta<typeof DailyCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { records: [] },
};

/* 前日から続く記録は 0:00 から、翌日へ続く記録は 24:00 までを表示する */
export const AcrossMidnight: Story = {
  args: {
    records: [
      {
        ...record("5", "夜更かしの作業", "00:00", "01:30", "#B07AA8"),
        started_at: "2026-11-27T23:00:00+09:00",
      },
      {
        ...record("6", "深夜作業", "23:00", "23:59", "#C2714F"),
        ended_at: "2026-11-29T01:00:00+09:00",
      },
    ],
  },
};

export const OtherDay: Story = {
  args: { now: Date.parse("2026-11-29T10:00:00+09:00") },
};

/* ドラッグ（タッチはタップ）で時間帯を選べる */
export const Selectable: Story = {
  args: { onSelect: fn() },
  play: async ({ args, canvasElement }) => {
    const area = canvasElement.querySelector<HTMLElement>(".cursor-pointer");
    if (!area) throw new Error("選択できる範囲がありません");
    const top = area.getBoundingClientRect().top;
    const pointer = { button: 0, pointerId: 1, pointerType: "mouse" };
    const hour = (h: number) => from + h * 60 * 60 * 1000;

    /* 7:00 の枠から 9:30 の枠までドラッグすると 7:00 - 9:45 */
    await fireEvent.pointerDown(area, {
      ...pointer,
      clientY: top + 7 * 32 + 2,
    });
    await fireEvent.pointerMove(area, { ...pointer, clientY: top + 9.6 * 32 });
    await fireEvent.pointerUp(area, { ...pointer, clientY: top + 9.6 * 32 });
    await expect(args.onSelect).toHaveBeenLastCalledWith({
      start: hour(7),
      end: hour(9.75),
    });

    /* 上へドラッグしても開始と終了が入れ替わる */
    await fireEvent.pointerDown(area, {
      ...pointer,
      clientY: top + 3 * 32 + 2,
    });
    await fireEvent.pointerUp(area, { ...pointer, clientY: top + 2 * 32 + 2 });
    await expect(args.onSelect).toHaveBeenLastCalledWith({
      start: hour(2),
      end: hour(3.25),
    });

    /* タップは指を離した位置の 1 枠 */
    const touch = { ...pointer, pointerId: 2, pointerType: "touch" };
    await fireEvent.pointerDown(area, { ...touch, clientY: top + 12 * 32 + 2 });
    await fireEvent.pointerUp(area, { ...touch, clientY: top + 12 * 32 + 4 });
    await expect(args.onSelect).toHaveBeenLastCalledWith({
      start: hour(12),
      end: hour(12.25),
    });

    /* 指が動いたらスクロールとみなして選ばない */
    await fireEvent.pointerDown(area, { ...touch, clientY: top + 14 * 32 });
    await fireEvent.pointerUp(area, { ...touch, clientY: top + 15 * 32 });
    await expect(args.onSelect).toHaveBeenCalledTimes(3);
  },
};

/* 登録モーダルを開いている間は、選んだ時間帯を示したままにする */
export const Pending: Story = {
  args: {
    pending: {
      start: Date.parse("2026-11-28T11:00:00+09:00"),
      end: Date.parse("2026-11-28T12:45:00+09:00"),
    },
  },
};
