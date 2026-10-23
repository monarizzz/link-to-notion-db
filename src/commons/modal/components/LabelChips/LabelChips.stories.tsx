import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";

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
          label: "会議",
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
    labels: ["作業", "休憩", "会議", "学習", "運動", "その他"],
  },
};

export const Empty: Story = {
  args: {
    labels: [],
  },
};
