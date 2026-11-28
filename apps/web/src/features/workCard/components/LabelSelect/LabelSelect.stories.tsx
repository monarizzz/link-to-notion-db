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
  title: "features/modal/components/LabelSelect",
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
