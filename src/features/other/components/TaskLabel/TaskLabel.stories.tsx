import type { Meta, StoryObj } from "@storybook/react-vite";

import TaskLabel from "./TaskLabel";

const meta = {
  component: TaskLabel,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: "Storybookの設定",
  size: 20,
};

export const Default: Story = {
  args: defaultArgs,
};

export const Colors: Story = {
  args: defaultArgs,
  decorators: [
    () => (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {[
          "default",
          "gray",
          "brown",
          "orange",
          "yellow",
          "green",
          "blue",
          "purple",
          "pink",
          "red",
        ].map((color) => (
          <TaskLabel key={color} title={color} size={20} color={color} />
        ))}
      </div>
    ),
  ],
};
