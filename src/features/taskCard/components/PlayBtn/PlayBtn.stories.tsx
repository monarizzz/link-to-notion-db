import type { Meta, StoryObj } from "@storybook/react-vite";

import PlayBtn from "./PlayBtn";

const meta = {
  component: PlayBtn,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlayBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
