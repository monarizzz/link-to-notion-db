import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

import WorkCard from "./WorkCard";
import DoingContent from "@/features/workCard/components/DoingContent/DoingContent";

const meta: Meta<typeof WorkCard> = {
  component: WorkCard,
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

type Story = StoryObj<typeof WorkCard>;

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
      <WorkCard
        isInput="todo"
        todoDetail={{ time: "1h", work: "デザインレビュー", priority: "high" }}
        labels={sampleLabels}
      />
      <WorkCard
        isInput="todo"
        todoDetail={{ time: "3h", work: "実装作業", priority: "medium" }}
        labels={sampleLabels}
      />
      <WorkCard
        isInput="todo"
        todoDetail={{ time: "5h30m", work: "ミーティング", priority: "low" }}
        labels={sampleLabels}
      />
      <WorkCard
        isInput="todo"
        todoDetail={{ time: "17h4m", work: "ドキュメント整備" }}
        labels={sampleLabels}
      />
      <TimerInputWrapper>
        <WorkCard isInput="timer" labels={sampleLabels} />
      </TimerInputWrapper>
      <TimerDoingWrapper>
        <WorkCard isInput="timer" labels={sampleLabels} />
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
