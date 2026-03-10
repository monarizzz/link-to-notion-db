import type { Meta, StoryObj } from "@storybook/react-vite";

import EditBtn from "./EditBtn";

const meta = {
  component: EditBtn,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EditBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
