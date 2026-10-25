import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormProvider, useForm } from "react-hook-form";

import LabelSelect from "./LabelSelect";

const FormDecorator = (Story: React.ComponentType) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta: Meta<typeof LabelSelect> = {
  component: LabelSelect,
  decorators: [FormDecorator],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof LabelSelect>;

export const Default: Story = {
  args: {
    labels: ["仕事", "プライベート", "勉強", "健康"],
    placeholder: "ラベルを選択",
    selectLabel: "ラベル",
  },
};

export const Empty: Story = {
  args: {
    labels: [],
    placeholder: "ラベルを選択",
    selectLabel: "ラベル",
  },
};
