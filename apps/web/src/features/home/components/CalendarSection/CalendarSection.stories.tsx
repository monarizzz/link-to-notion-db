import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import CalendarSection from "./CalendarSection";

/* 2026-11-28 0:00 (JST) */
const from = Date.parse("2026-11-28T00:00:00+09:00");

const meta = {
  component: CalendarSection,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    labels: [
      {
        id: "1",
        name: "開発",
        color: "#4A90D9",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "会議",
        color: "#E5A04B",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
    ],
    records: [
      {
        id: "1",
        title: "朝会",
        started_at: "2026-11-28T09:00:00+09:00",
        ended_at: "2026-11-28T09:30:00+09:00",
        created_at: "2026-11-28T00:00:00.000Z",
        updated_at: "2026-11-28T00:00:00.000Z",
        labels: [{ id: "2", name: "会議", color: "#E5A04B" }],
      },
    ],
    range: { from, to: from + 24 * 60 * 60 * 1000 },
    onCreated: fn(),
  },
} satisfies Meta<typeof CalendarSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ドラッグすると、選んだ時間帯を入れた記録モーダルが開く */
export const Default: Story = {};
