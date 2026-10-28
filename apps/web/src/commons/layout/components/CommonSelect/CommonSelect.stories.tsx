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

const sampleLabels = [
  {
    id: "1",
    name: "Option A",
    color: "#4A90D9",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Option B",
    color: "#E5A04B",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Option C",
    color: "#5BB98C",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
];

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
