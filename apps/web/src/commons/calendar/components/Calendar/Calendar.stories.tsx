import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DayCalendar from "./Calendar";
import { useForm, FormProvider } from "react-hook-form";

const WithFormProvider = (Story: React.ComponentType) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta = {
  component: DayCalendar,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  decorators: [WithFormProvider],
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
      {
        id: "3",
        name: "レビュー",
        color: "#5BB98C",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
    ],
  },
} satisfies Meta<typeof DayCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEvents: Story = {
  args: {
    initialDate: "2026-04-11",
    events: [
      {
        title: "朝会",
        start: "2026-04-11T09:00:00",
        end: "2026-04-11T09:30:00",
      },
      {
        title: "開発作業",
        start: "2026-04-11T10:00:00",
        end: "2026-04-11T12:00:00",
      },
      {
        title: "ランチ",
        start: "2026-04-11T12:00:00",
        end: "2026-04-11T13:00:00",
      },
      {
        title: "コードレビュー",
        start: "2026-04-11T15:00:00",
        end: "2026-04-11T15:15:00",
      },
    ],
  },
};

export const ShortEvents: Story = {
  args: {
    initialDate: "2026-04-11",
    events: [
      {
        title: "短いミーティング",
        start: "2026-04-11T10:00:00",
        end: "2026-04-11T10:05:00",
      },
      {
        title: "5分タスク",
        start: "2026-04-11T14:00:00",
        end: "2026-04-11T14:03:00",
      },
    ],
  },
};
