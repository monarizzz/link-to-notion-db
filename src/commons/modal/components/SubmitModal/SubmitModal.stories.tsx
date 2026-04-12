import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm, FormProvider } from "react-hook-form";

import SubmitModal from "./SubmitModal";

const meta: Meta<typeof SubmitModal> = {
  component: SubmitModal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-23T09:00:00.000+0900",
          end: "2026-03-24T11:00:00.000+0900",
          label: "開発",
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof SubmitModal>;

export const Default: Story = {
  args: {
    isOpenModal: true,
    setIsOpenModal: () => {},
  },
};
