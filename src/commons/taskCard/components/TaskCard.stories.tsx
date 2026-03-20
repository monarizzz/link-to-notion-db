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

const sampleLabels = ["仕事", "プライベート", "勉強", "健康"];

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TaskCard isInput={false} todoDetail={{ time: "1h", work: "デザインレビュー", priority: "high" }} labels={sampleLabels} />
      <TaskCard isInput={false} todoDetail={{ time: "3h", work: "実装作業", priority: "medium" }} labels={sampleLabels} />
      <TaskCard isInput={false} todoDetail={{ time: "5h30m", work: "ミーティング", priority: "low" }} labels={sampleLabels} />
      <TaskCard isInput={false} todoDetail={{ time: "17h4m", work: "ドキュメント整備" }} labels={sampleLabels} />
      <TaskCard isInput={true} labels={sampleLabels} />
    </div>
  ),
};

export const High: Story = {
  args: {
    isInput: false,
    todoDetail: { time: "1h", work: "デザインレビュー", priority: "high" },
    labels: sampleLabels,
  },
};

export const Medium: Story = {
  args: {
    isInput: false,
    todoDetail: { time: "3h", work: "実装作業", priority: "medium" },
    labels: sampleLabels,
  },
};

export const Low: Story = {
  args: {
    isInput: false,
    todoDetail: { time: "5h30m", work: "ミーティング", priority: "low" },
    labels: sampleLabels,
  },
};

export const Empty: Story = {
  args: {
    isInput: false,
    todoDetail: { time: "17h4m", work: "ドキュメント整備" },
    labels: sampleLabels,
  },
};

export const Input: Story = {
  args: {
    isInput: true,
    labels: sampleLabels,
  },
};
