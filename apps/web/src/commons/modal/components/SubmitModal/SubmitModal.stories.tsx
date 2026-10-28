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
    labels: [
      {
        id: "1",
        name: "開発",
        color: "#4A90D9",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "会議",
        color: "#E5A04B",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
      {
        id: "3",
        name: "レビュー",
        color: "#5BB98C",
        created_at: "2026-05-01T00:00:00.000Z",
        updated_at: "2026-05-01T00:00:00.000Z",
      },
    ],
    isOpenModal: true,
    setIsOpenModal: () => {},
  },
};

// useForm は errors の参照が変わるたびに formState を更新するため、描画ごとに作り直さない
const invalidTimeErrors = {
  end: {
    type: "custom",
    message: "開始時間は終了時間より前にしてください",
  },
};

export const InvalidTime: Story = {
  args: Default.args,
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          start: "2026-03-24T11:00:00.000+0900",
          end: "2026-03-24T09:00:00.000+0900",
          label: "開発",
        },
        errors: invalidTimeErrors,
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};
