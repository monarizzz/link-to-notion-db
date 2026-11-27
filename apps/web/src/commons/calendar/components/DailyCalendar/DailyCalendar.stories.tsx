import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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
