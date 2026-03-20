import type { Meta, StoryObj } from "@storybook/react";
import CurrentTime from "./CurrentTime";

const meta = {
  component: CurrentTime,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CurrentTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
