import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TaskCard from "./TaskCard";
import DoingContent from "@/features/taskCard/components/doingContent/doingContent";

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

const sampleLabels = ["仕事", "プライベート", "勉強", "健康"];

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "1h", work: "デザインレビュー", priority: "high" }}
        labels={sampleLabels}
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "3h", work: "実装作業", priority: "medium" }}
        labels={sampleLabels}
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "5h30m", work: "ミーティング", priority: "low" }}
        labels={sampleLabels}
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "17h4m", work: "ドキュメント整備" }}
        labels={sampleLabels}
      />
      <TaskCard isInput="input" labels={sampleLabels} />
      <TaskCard isInput="doing" time="00:12:34" work="デザイン修正" labels={sampleLabels} />
      <TaskCard isInput="doing" time="00:12:34" labels={sampleLabels} />
    </div>
  ),
};

export const High: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "1h", work: "デザインレビュー", priority: "high" },
    labels: sampleLabels,
  },
};

export const Medium: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "3h", work: "実装作業", priority: "medium" },
    labels: sampleLabels,
  },
};

export const Low: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "5h30m", work: "ミーティング", priority: "low" },
    labels: sampleLabels,
  },
};

export const NoPriority: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "17h4m", work: "ドキュメント整備" },
    labels: sampleLabels,
  },
};

export const Input: Story = {
  args: {
    isInput: "input",
    labels: sampleLabels,
  },
};

export const Doing: Story = {
  args: {
    isInput: "doing",
    time: "00:12:34",
    work: "デザイン修正",
    labels: sampleLabels,
  },
};

export const DoingNoWork: Story = {
  render: () => (
    <div className="flex items-center gap-3 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      <DoingContent time="00:12:34" />
    </div>
  ),
};
