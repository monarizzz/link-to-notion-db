import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TaskCard from "./TaskCard";

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TaskCard time="1h" work="デザインレビュー" priority="high" />
      <TaskCard time="3h" work="実装作業" priority="medium" />
      <TaskCard time="5h30m" work="ミーティング" priority="low" />
      <TaskCard time="17h4m" work="ドキュメント整備" />
    </div>
  ),
};

export const High: Story = {
  args: {
    time: "1h",
    work: "デザインレビュー",
    priority: "high",
  },
};

export const Medium: Story = {
  args: {
    time: "3h",
    work: "実装作業",
    priority: "medium",
  },
};

export const Low: Story = {
  args: {
    time: "5h30m",
    work: "ミーティング",
    priority: "low",
  },
};

export const Empty: Story = {
  args: {
    time: "17h4m",
    work: "ドキュメント整備",
  },
};
