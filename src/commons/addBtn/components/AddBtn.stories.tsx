import type { Meta, StoryObj } from "@storybook/react-vite";

import AddBtn from "./AddBtn";

const meta = {
  component: AddBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AddBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = { size: 50, properties: {} };

export const Default: Story = {
  args: defaultArgs,
};
