import type { Meta, StoryObj } from "@storybook/react-vite";

import EditContainer from "./EditContainer";

const meta = {
  component: EditContainer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EditContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hours: 2,
    minutes: 0,
  },
};
