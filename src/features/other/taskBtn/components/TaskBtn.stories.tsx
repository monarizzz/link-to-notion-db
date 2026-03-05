import type { Meta, StoryObj } from "@storybook/react-vite";

import TaskBtn from "./TaskBtn";

const meta = {
  component: TaskBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  select: "作業内容",
};

export const Default: Story = {
  args: defaultArgs,
};
