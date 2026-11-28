import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TimeGrid from "./TimeGrid";

const meta = {
  component: TimeGrid,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-200 bg-(--background-2)">
        <Story />
      </div>
    ),
  ],
  args: { hours: 24 },
} satisfies Meta<typeof TimeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* 1:00 の線（y = 56px）の近くのラベルを隠す */
export const HiddenNearY: Story = {
  args: { hiddenNearY: 45 },
};
