import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";

import StopBtn from "./StopBtn";

const WithFormProvider = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>
        <StopBtn
          labels={[
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
          ]}
        />
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
