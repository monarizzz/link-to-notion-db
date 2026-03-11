import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import EditContainer from "./EditContainer";
import type { AddDataForm } from "@/commons/addData/components/AddData";

const meta = {
  component: EditContainer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm<AddDataForm>({
        defaultValues: {
          title: "",
          label: "",
          sDate: "",
          eDate: "",
          sTime: "",
          eTime: "",
          total: 0,
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof EditContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
