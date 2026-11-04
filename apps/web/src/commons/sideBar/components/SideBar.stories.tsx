import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideBar from "./SideBar";

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

const mockEvents = [
  {
    id: "1",
    title: "朝会",
    start: "2026-05-03T09:00:00",
    end: "2026-05-03T09:30:00",
  },
  {
    id: "2",
    title: "開発作業",
    start: "2026-05-03T10:00:00",
    end: "2026-05-03T12:00:00",
  },
  {
    id: "3",
    title: "コードレビュー",
    start: "2026-05-03T15:00:00",
    end: "2026-05-03T15:30:00",
  },
];

const range = {
  from: new Date("2026-05-03T00:00:00+09:00").getTime(),
  to: new Date("2026-05-04T00:00:00+09:00").getTime(),
};

export const Default: Story = {
  args: {
    today: mockEvents,
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
        start: "2026-05-02T23:00:00+09:00",
        end: "2026-05-03T01:00:00+09:00",
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
