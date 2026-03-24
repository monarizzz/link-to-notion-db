import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";

import StopBtn from "./StopBtn";

const WithFormProvider = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>
        <StopBtn />
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
