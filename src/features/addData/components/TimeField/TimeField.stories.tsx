import type { Meta, StoryObj } from "@storybook/react-vite";

import TimeField from "./TimeField";

const meta = {
  component: TimeField,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "10:00 - 11:00" },
};

export const All: Story = {
  args: { text: "" },
  render: () => (
    <div className="flex flex-col">
      <TimeField text="開始" />
      <TimeField text="終了" />
    </div>
  ),
};
