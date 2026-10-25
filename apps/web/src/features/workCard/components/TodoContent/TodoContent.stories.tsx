import type { Meta, StoryObj } from "@storybook/react-vite";

import TodoContent from "./TodoContent";

const meta = {
  component: TodoContent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TodoContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    time: "10:00 - 11:00",
    work: "デザインレビュー",
  },
};

export const High: Story = {
  args: {
    time: "10:00 - 11:00",
    work: "デザインレビュー",
    priority: "high",
  },
};

export const Medium: Story = {
  args: {
    time: "10:00 - 11:00",
    work: "デザインレビュー",
    priority: "medium",
  },
};

export const Low: Story = {
  args: {
    time: "10:00 - 11:00",
    work: "デザインレビュー",
    priority: "low",
  },
};
