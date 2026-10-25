import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";
import NowDisplay from "./NowDisplay";

const meta = {
  component: NowDisplay,
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
} satisfies Meta<typeof NowDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
