import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SelectionBlock from "./SelectionBlock";

/* 2026-11-28 0:00 (JST) */
const from = Date.parse("2026-11-28T00:00:00+09:00");
const at = (time: string) => Date.parse(`2026-11-28T${time}:00+09:00`);

const meta = {
  component: SelectionBlock,
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
  args: { from, start: at("00:00"), end: at("01:45") },
} satisfies Meta<typeof SelectionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* 1 枠（15 分）は最低の高さで描く */
export const OneSlot: Story = {
  args: { end: at("00:15") },
};
