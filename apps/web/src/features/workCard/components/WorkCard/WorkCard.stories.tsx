import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

import WorkCard from "./WorkCard";
import DoingContent from "../DoingContent/DoingContent";

const meta: Meta<typeof WorkCard> = {
  title: "commons/workCard/components/WorkCard",
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

const sampleLabels = [
  {
    id: "1",
    name: "仕事",
    color: "#4A90D9",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "プライベート",
    color: "#E5A04B",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "3",
    name: "勉強",
    color: "#5BB98C",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "4",
    name: "健康",
    color: "#D9534F",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
];

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
        todoDetail={{ time: "1h", work: "デザインレビュー", priority: "high" }}
        labels={sampleLabels}
      />
      <WorkCard
        todoDetail={{ time: "3h", work: "実装作業", priority: "medium" }}
        labels={sampleLabels}
      />
      <WorkCard
        todoDetail={{ time: "5h30m", work: "ミーティング", priority: "low" }}
        labels={sampleLabels}
      />
      <WorkCard
        todoDetail={{ time: "17h4m", work: "ドキュメント整備" }}
        labels={sampleLabels}
      />
      <TimerInputWrapper>
        <WorkCard labels={sampleLabels} />
      </TimerInputWrapper>
      <TimerDoingWrapper>
        <WorkCard labels={sampleLabels} />
      </TimerDoingWrapper>
    </div>
  ),
};

export const High: Story = {
  args: {
    todoDetail: { time: "1h", work: "デザインレビュー", priority: "high" },
    labels: sampleLabels,
  },
};

export const Medium: Story = {
  args: {
    todoDetail: { time: "3h", work: "実装作業", priority: "medium" },
    labels: sampleLabels,
  },
};

export const Low: Story = {
  args: {
    todoDetail: { time: "5h30m", work: "ミーティング", priority: "low" },
    labels: sampleLabels,
  },
};

export const NoPriority: Story = {
  args: {
    todoDetail: { time: "17h4m", work: "ドキュメント整備" },
    labels: sampleLabels,
  },
};

export const Input: Story = {
  args: {
    labels: sampleLabels,
  },
};

export const Doing: Story = {
  args: {
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
    <div className="flex w-90 items-center gap-3 rounded-3xl bg-[#3A3A3A] px-4 py-3.5">
      <DoingContent labels={sampleLabels} />
    </div>
  ),
};
