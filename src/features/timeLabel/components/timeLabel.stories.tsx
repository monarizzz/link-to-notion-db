import type { Meta, StoryObj } from "@storybook/react-vite";

import timeLabel from "./timeLabel";

const meta = {
  component: timeLabel,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof timeLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  start: "2026-02-14T09:00:00",
  end: "2026-02-14T10:30:00",
  size: 20,
};

export const Default: Story = {
  args: defaultArgs,
};
