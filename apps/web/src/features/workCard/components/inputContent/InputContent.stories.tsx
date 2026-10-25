import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";

import InputContent from "./InputContent";

const meta = {
  component: InputContent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof InputContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: ["仕事", "プライベート", "勉強", "健康"],
  },
};
