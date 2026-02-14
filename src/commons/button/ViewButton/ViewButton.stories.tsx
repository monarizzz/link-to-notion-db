import type { Meta, StoryObj } from "@storybook/react-vite";

import ViewButton from "./ViewButton";

const meta = {
  component: ViewButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ViewButton>;

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
