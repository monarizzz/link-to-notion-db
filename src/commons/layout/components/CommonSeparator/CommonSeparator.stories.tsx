import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CommonSeparator from "./CommonSeparator";

const meta: Meta<typeof CommonSeparator> = {
  component: CommonSeparator,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof CommonSeparator>;

export const Horizontal: Story = {
  render: () => (
    <div className="p-4 w-64">
      <CommonSeparator />
    </div>
  ),
};

export const HorizontalDashed: Story = {
  render: () => (
    <div className="p-4 w-64">
      <CommonSeparator dashed />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-4 flex h-16">
      <CommonSeparator vertical />
    </div>
  ),
};

export const VerticalDashed: Story = {
  render: () => (
    <div className="p-4 flex h-16">
      <CommonSeparator vertical dashed />
    </div>
  ),
};
