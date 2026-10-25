import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CommonSelect from "./CommonSelect";

const meta: Meta<typeof CommonSelect> = {
  component: CommonSelect,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof CommonSelect>;

const sampleLabels = ["Option A", "Option B", "Option C"];

export const Default: Story = {
  args: {
    labels: sampleLabels,
    placeholder: "選択してください",
    selectLabel: "オプション",
  },
};

export const WithValue: Story = {
  args: {
    labels: sampleLabels,
    placeholder: "選択してください",
    selectLabel: "オプション",
    form: {
      value: "Option A",
      onChange: (value: string) => console.log(value),
    },
  },
};
