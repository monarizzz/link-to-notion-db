import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import RecordBlock from "./RecordBlock";

/* 2026-11-28 0:00 (JST) */
const from = Date.parse("2026-11-28T00:00:00+09:00");

const record = (
  title: string | null,
  start: string,
  end: string,
  color?: string,
) => ({
  id: "1",
  title,
  started_at: `2026-11-28T${start}:00+09:00`,
  ended_at: `2026-11-28T${end}:00+09:00`,
  created_at: "2026-11-28T00:00:00.000Z",
  updated_at: "2026-11-28T00:00:00.000Z",
  labels: color ? [{ id: "label-1", name: "ラベル", color }] : [],
});

const meta = {
  component: RecordBlock,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-24 bg-(--background-2)">
        <Story />
      </div>
    ),
  ],
  args: {
    range: { from, to: from + 24 * 60 * 60 * 1000 },
    record: record("履修登録", "00:00", "02:00", "#5A9EEF"),
  },
} satisfies Meta<typeof RecordBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* 低い記録は時刻とタイトルを横に並べる */
export const Short: Story = {
  args: { record: record("面接準備", "00:00", "00:05", "#32D583") },
};

export const WithoutLabel: Story = {
  args: { record: record("UIデザインの修正", "00:00", "02:00") },
};

export const WithoutTitle: Story = {
  args: { record: record(null, "00:00", "02:00", "#FFB547") },
};
