import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HomePageMain from "./HomePageMain";

const meta = {
  component: HomePageMain,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomePageMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: ["開発", "会議", "レビュー"],
  },
};
