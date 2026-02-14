import type { Meta, StoryObj } from "@storybook/react-vite";

import Sidebar from "./Sidebar";

const meta = {
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: [
      { text: "Timeline", icon: "today", path: "Timeline" },
      { text: "Dashboard", icon: "dashboard", path: "Dashboard" },
    ],
  },
};
