import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideBar from "./SideBar";
import type { WorkRecord } from "@/infra/api/client";

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

const mockRecords: WorkRecord[] = [
  {
    id: "1",
    title: "朝会",
    started_at: "2026-05-03T09:00:00",
    ended_at: "2026-05-03T09:30:00",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
    labels: [],
  },
  {
    id: "2",
    title: "開発作業",
    started_at: "2026-05-03T10:00:00",
    ended_at: "2026-05-03T12:00:00",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
    labels: [],
  },
  {
    id: "3",
    title: "コードレビュー",
    started_at: "2026-05-03T15:00:00",
    ended_at: "2026-05-03T15:30:00",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
    labels: [],
  },
];

const range = {
  from: new Date("2026-05-03T00:00:00+09:00").getTime(),
  to: new Date("2026-05-04T00:00:00+09:00").getTime(),
};

export const Default: Story = {
  args: {
    today: mockRecords,
    range,
  },
};

/* 前日 23:00〜今日 1:00 の記録は、今日の 1 時間分だけ数える */
export const CrossDay: Story = {
  args: {
    today: [
      {
        id: "1",
        title: "夜の作業",
        started_at: "2026-05-02T23:00:00+09:00",
        ended_at: "2026-05-03T01:00:00+09:00",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
        labels: [],
      },
    ],
    range,
  },
};

export const Empty: Story = {
  args: {
    today: [],
    range,
  },
};
