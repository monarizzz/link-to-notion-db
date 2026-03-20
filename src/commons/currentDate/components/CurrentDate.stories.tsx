import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CurrentDate from "./currentDate";

const meta = {
  component: CurrentDate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CurrentDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
