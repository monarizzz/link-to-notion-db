import type { Meta, StoryObj } from "@storybook/react-vite";

import InputContent from "./InputContent";

const meta = {
  component: InputContent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof InputContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: ["仕事", "プライベート", "勉強", "健康"],
  },
};
