import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";
import { expect, userEvent, within } from "storybook/test";

import LabelChips from "./LabelChips";

const meta = {
  component: LabelChips,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          label: "3",
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof LabelChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: [
      {
        id: "1",
        name: "作業",
        color: "#4A90D9",
      },
      {
        id: "2",
        name: "休憩",
        color: "#E5A04B",
      },
      {
        id: "3",
        name: "会議",
        color: "#5BB98C",
      },
      {
        id: "4",
        name: "学習",
        color: "#D9534F",
      },
      {
        id: "5",
        name: "運動",
        color: "#9B6BD9",
      },
      {
        id: "6",
        name: "その他",
        color: "#8E8E93",
      },
    ],
  },
};

export const ToggleSelection: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const meeting = canvas.getByRole("button", { name: "会議" });

    await userEvent.click(meeting);
    await expect(meeting).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(meeting);
    await expect(meeting).toHaveAttribute("aria-pressed", "true");
  },
};

export const Empty: Story = {
  args: {
    labels: [],
  },
};
