import type { Meta, StoryObj } from "@storybook/react-vite";

import DoingContent from "./doingContent";

const meta = {
  component: DoingContent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DoingContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    time: "10:00 - 11:00",
    work: "デザインレビュー",
  },
};

export const NoWork: Story = {
  args: {
    time: "10:00 - 11:00",
  },
};
