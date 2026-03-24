import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

import TaskCard from "./TaskCard";
import DoingContent from "@/features/taskCard/components/doingContent/doingContent";

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  parameters: {
    layout: "fullscreen",
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

export default meta;

type Story = StoryObj<typeof TaskCard>;

const sampleLabels = ["仕事", "プライベート", "勉強", "健康"];

const TimerInputWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { start: false, end: false } });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const TimerDoingWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: { start: "2026-03-24T10:00:00.000+09:00", end: false },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

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
      <TimerInputWrapper>
        <TaskCard isInput="timer" labels={sampleLabels} />
      </TimerInputWrapper>
      <TimerDoingWrapper>
        <TaskCard isInput="timer" labels={sampleLabels} />
      </TimerDoingWrapper>
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
    isInput: "timer",
    labels: sampleLabels,
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
    labels: sampleLabels,
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { start: "2026-03-24T10:00:00.000+09:00", end: false },
      });
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
      <DoingContent />
    </div>
  ),
};
