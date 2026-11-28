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
    labels: [
      {
        id: "1",
        name: "仕事",
        color: "#4A90D9",
      },
      {
        id: "2",
        name: "プライベート",
        color: "#E5A04B",
      },
      {
        id: "3",
        name: "勉強",
        color: "#5BB98C",
      },
      {
        id: "4",
        name: "健康",
        color: "#D9534F",
      },
    ],
  },
};
