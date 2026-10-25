import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PriorityBadge from "./PriorityBadge";

const meta: Meta<typeof PriorityBadge> = {
  component: PriorityBadge,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PriorityBadge>;

export const All: Story = {
  render: () => (
    <div className="flex gap-2">
      <PriorityBadge priority="high" />
      <PriorityBadge priority="medium" />
      <PriorityBadge priority="low" />
      <PriorityBadge />
    </div>
  ),
};

export const High: Story = {
  args: {
    priority: "high",
  },
};

export const Medium: Story = {
  args: {
    priority: "medium",
  },
};

export const Low: Story = {
  args: {
    priority: "low",
  },
};

export const Empty: Story = {
  args: {
    priority: undefined,
  },
};
