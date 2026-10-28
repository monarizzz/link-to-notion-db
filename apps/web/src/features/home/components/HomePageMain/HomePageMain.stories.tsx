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
