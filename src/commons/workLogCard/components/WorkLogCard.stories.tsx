import type { Meta, StoryObj } from "@storybook/react-vite";

import WorkLogCard from "./WorkLogCard";

const meta = {
  component: WorkLogCard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WorkLogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  record: {
    id: "dummy-page-id-123",
    taskName: "Storybookの設定",
    start: "2026-02-14T09:00:00",
    end: "2026-02-14T10:30:00",
    url: "https://www.notion.so/dummy-page-id-123",
    color: "blue",
    detail: "Claudeのプロンプト作成",
  },
};

export const Default: Story = {
  args: defaultArgs,
};
