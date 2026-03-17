import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm, FormProvider } from "react-hook-form";
import type { AddDataForm } from "@/commons/addData/components/AddData";
import DateGroup from "./DateGroup";

const meta = {
  component: DateGroup,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DateGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = () => {
  const methods = useForm<AddDataForm>({
    defaultValues: {
      title: "",
      label: "",
      sDate: new Date().toISOString().split("T")[0],
      eDate: new Date().toISOString().split("T")[0],
      sTime: "09:00",
      eTime: "09:20",
      hTotal: 0,
      mTotal: 20,
      isStart: false,
    },
  });
  return (
    <FormProvider {...methods}>
      <DateGroup />
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
