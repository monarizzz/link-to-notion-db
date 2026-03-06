import type { Meta, StoryObj } from "@storybook/react-vite";

import ViewBtn from "./ViewBtn";

const meta = {
  component: ViewBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ViewBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: [
      { id: "1", name: "プログラミング" },
      { id: "2", name: "インターン" },
    ],
  },
};
