import type { Meta, StoryObj } from "@storybook/react-vite";

import AddWork from "./AddWork";

const meta = {
  component: AddWork,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AddWork>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  selects: ["開発", "インターン", "雑務"],
};

export const Default: Story = {
  args: defaultArgs,
};
