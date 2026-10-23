import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";

import StopBtn from "./StopBtn";

const WithFormProvider = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>
        <StopBtn labels={["仕事", "プライベート", "勉強", "健康"]} />
      </form>
    </FormProvider>
  );
};

const meta = {
  component: WithFormProvider,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WithFormProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
