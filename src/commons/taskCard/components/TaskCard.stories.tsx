import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

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

const TimerInputWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { start: false, end: false } });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const TimerDoingWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { start: true, end: false } });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "1h", work: "デザインレビュー", priority: "high" }}
        labels={sampleLabels}
        time=""
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "3h", work: "実装作業", priority: "medium" }}
        labels={sampleLabels}
        time=""
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "5h30m", work: "ミーティング", priority: "low" }}
        labels={sampleLabels}
        time=""
      />
      <TaskCard
        isInput="todo"
        todoDetail={{ time: "17h4m", work: "ドキュメント整備" }}
        labels={sampleLabels}
        time=""
      />
      <TimerInputWrapper>
        <TaskCard isInput="timer" labels={sampleLabels} time="" />
      </TimerInputWrapper>
      <TimerDoingWrapper>
        <TaskCard isInput="timer" time="00:12:34" labels={sampleLabels} />
      </TimerDoingWrapper>
    </div>
  ),
};

export const High: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "1h", work: "デザインレビュー", priority: "high" },
    labels: sampleLabels,
    time: "",
  },
};

export const Medium: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "3h", work: "実装作業", priority: "medium" },
    labels: sampleLabels,
    time: "",
  },
};

export const Low: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "5h30m", work: "ミーティング", priority: "low" },
    labels: sampleLabels,
    time: "",
  },
};

export const NoPriority: Story = {
  args: {
    isInput: "todo",
    todoDetail: { time: "17h4m", work: "ドキュメント整備" },
    labels: sampleLabels,
    time: "",
  },
};

export const Input: Story = {
  args: {
    isInput: "timer",
    labels: sampleLabels,
    time: "",
  },
  decorators: [
    (Story) => {
      const methods = useForm({ defaultValues: { start: false, end: false } });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

export const Doing: Story = {
  args: {
    isInput: "timer",
    time: "00:12:34",
    labels: sampleLabels,
  },
  decorators: [
    (Story) => {
      const methods = useForm({ defaultValues: { start: true, end: false } });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

export const DoingNoWork: Story = {
  render: () => (
    <div className="flex items-center gap-3 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      <DoingContent time="00:12:34" />
    </div>
  ),
};
