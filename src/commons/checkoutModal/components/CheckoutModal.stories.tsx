import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";

import CheckoutModal from "./CheckoutModal";

const meta: Meta<typeof CheckoutModal> = {
  component: CheckoutModal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const { control } = useForm({
        defaultValues: {
          start: "2026-03-23T09:00:00.000+0900",
          end: "2026-03-24T11:00:00.000+0900",
          label: "開発",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Story args={{ control: control as any }} />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof CheckoutModal>;

export const Default: Story = {};
