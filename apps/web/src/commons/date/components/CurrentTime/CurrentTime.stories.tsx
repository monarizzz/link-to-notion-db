import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";
import CurrentTime from "./CurrentTime";

const meta = {
  component: CurrentTime,
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
} satisfies Meta<typeof CurrentTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
