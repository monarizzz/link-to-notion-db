// Replace your-framework with nextjs or nextjs-vite
import type { Meta, StoryObj } from "@storybook/react-vite";

import taskButton from "./taskButton";

const meta = {
  component: taskButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof taskButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  task: "作業内容",
};

export const Default: Story = {
  args: defaultArgs,
};
