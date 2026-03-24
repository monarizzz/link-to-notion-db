import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import GoNotionBtn from "./GoNotionBtn";

const meta: Meta<typeof GoNotionBtn> = {
  component: GoNotionBtn,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof GoNotionBtn>;

export const Default: Story = {
  args: {
    url: "https://www.notion.so",
    size: 32,
  },
};

export const Small: Story = {
  args: {
    url: "https://www.notion.so",
    size: 20,
  },
};

export const Large: Story = {
  args: {
    url: "https://www.notion.so",
    size: 48,
  },
};
