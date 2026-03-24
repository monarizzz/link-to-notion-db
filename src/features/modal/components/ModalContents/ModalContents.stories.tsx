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
          label: "開発",
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

export const Default: Story = {};

export const NoLabel: Story = {
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
