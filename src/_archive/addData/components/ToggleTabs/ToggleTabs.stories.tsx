import type { Meta, StoryObj } from "@storybook/react-vite";

import ToggleTabs from "./ToggleTabs";

const meta = {
  component: ToggleTabs,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
