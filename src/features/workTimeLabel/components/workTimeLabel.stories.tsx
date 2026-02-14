import type { Meta, StoryObj } from "@storybook/react-vite";

import workTimeLabel from "./workTimeLabel";

const meta = {
  component: workTimeLabel,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof workTimeLabel>;

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
