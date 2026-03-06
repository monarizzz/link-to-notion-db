import type { Meta, StoryObj } from "@storybook/react-vite";

import TaskBtn from "./TaskBtn";

/* この場合はcenteredで良い */
const meta = {
  component: TaskBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  label: "作業内容",
  setLabel: false,
  onClick: () => {},
};

export const Default: Story = {
  args: defaultArgs,
};
