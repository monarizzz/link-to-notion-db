import type { Meta, StoryObj } from "@storybook/react-vite";

import deleteBtn from "./deleteBtn";

const meta = {
  component: deleteBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof deleteBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  size: 10,
};

export const Default: Story = {
  args: defaultArgs,
};
