import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm, FormProvider } from "react-hook-form";

import PlayBtn from "./PlayBtn";

const FormDecorator = (Story: React.FC) => {
  const methods = useForm({ defaultValues: { start: "" } });
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta = {
  component: PlayBtn,
  decorators: [FormDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlayBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
