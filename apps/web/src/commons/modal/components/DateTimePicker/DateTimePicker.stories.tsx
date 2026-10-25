import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";

import DateTimePicker from "./DateTimePicker";

const meta = {
  component: DateTimePicker,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-23T09:30:00.000+0900",
          end: "2026-03-23T10:43:00.000+0900",
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    name: "start",
  },
};

export const End: Story = {
  args: {
    name: "end",
  },
};
