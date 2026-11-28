import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";

import ModalContents from "./ModalContents";

const meta = {
  component: ModalContents,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-24T09:00:00.000+0900",
          end: "2026-03-24T11:00:00.000+0900",
          label: "1",
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof ModalContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: [
      {
        id: "1",
        name: "開発",
        color: "#4A90D9",
      },
      {
        id: "2",
        name: "会議",
        color: "#E5A04B",
      },
      {
        id: "3",
        name: "レビュー",
        color: "#5BB98C",
      },
    ],
  },
};

export const NoLabel: Story = {
  args: Default.args,
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-24T09:00:00.000+0900",
          end: "2026-03-24T11:00:00.000+0900",
          label: "",
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};
