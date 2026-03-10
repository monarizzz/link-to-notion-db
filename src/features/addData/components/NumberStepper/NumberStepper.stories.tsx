import type { Meta, StoryObj } from "@storybook/react-vite";

import NumberStepper from "./NumberStepper";

const meta = {
  component: NumberStepper,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 2,
    max: 6,
  },
};
