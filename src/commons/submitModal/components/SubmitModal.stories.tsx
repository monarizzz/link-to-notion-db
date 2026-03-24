import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

import CheckoutModal from "./SubmitModal";

const meta: Meta<typeof CheckoutModal> = {
  component: CheckoutModal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-23T09:00:00.000+0900",
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
};

export default meta;

type Story = StoryObj<typeof CheckoutModal>;

export const Default: Story = {};
