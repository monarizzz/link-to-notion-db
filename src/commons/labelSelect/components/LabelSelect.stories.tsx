import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LabelSelect from "./LabelSelect";

const meta: Meta<typeof LabelSelect> = {
  component: LabelSelect,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof LabelSelect>;

export const Default: Story = {
  args: {
    labels: ["仕事", "プライベート", "勉強", "健康"],
    placeholder: "ラベルを選択",
    selectLabel: "ラベル",
  },
};

export const Empty: Story = {
  args: {
    labels: [],
    placeholder: "ラベルを選択",
    selectLabel: "ラベル",
  },
};
