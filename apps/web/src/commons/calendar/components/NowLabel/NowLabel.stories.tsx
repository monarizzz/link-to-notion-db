import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import NowLabel from "./NowLabel";

/* 2026-11-28 0:00 (JST) */
const from = Date.parse("2026-11-28T00:00:00+09:00");

const meta = {
  component: NowLabel,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-24 bg-(--background-2)">
        <Story />
      </div>
    ),
  ],
  args: { from, now: Date.parse("2026-11-28T01:30:00+09:00") },
} satisfies Meta<typeof NowLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
