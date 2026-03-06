import type { Meta, StoryObj } from "@storybook/react-vite";

import AddData from "./AddData";

const meta = {
  component: AddData,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AddData>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  labels: ["開発", "インターン", "雑務"],
};

export const Default: Story = {
  args: defaultArgs,
};
