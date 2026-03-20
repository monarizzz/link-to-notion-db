import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NowDisplay from "./NowDisplay";

const meta = {
  component: NowDisplay,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NowDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
