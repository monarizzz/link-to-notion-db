import type { Meta, StoryObj } from "@storybook/react-vite";

import DeleteBtn from "./DeleteBtn";

const meta = {
  component: DeleteBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DeleteBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  size: 10,
  pageId: "1",
};

export const Default: Story = {
  args: defaultArgs,
};
