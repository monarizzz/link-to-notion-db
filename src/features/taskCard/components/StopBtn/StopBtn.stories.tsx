import type { Meta, StoryObj } from "@storybook/react-vite";

import StopBtn from "./StopBtn";

const meta = {
  component: StopBtn,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof StopBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
