import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomePageMain from "./HomePageMain";

const meta = {
  component: HomePageMain,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
} satisfies Meta<typeof HomePageMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: ["開発", "会議", "レビュー"],
    today: [
      {
        id: "1",
        title: "朝会",
        start: "2026-05-03T09:00:00",
        end: "2026-05-03T09:30:00",
        url: "https://notion.so/1",
        color: "#4A90D9",
      },
    ],
  },
};
