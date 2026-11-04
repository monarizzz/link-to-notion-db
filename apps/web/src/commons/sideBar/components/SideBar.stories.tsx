import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideBar from "./SideBar";

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

const mockEvents = [
  {
    id: "1",
    title: "朝会",
    start: "2026-05-03T09:00:00",
    end: "2026-05-03T09:30:00",
  },
  {
    id: "2",
    title: "開発作業",
    start: "2026-05-03T10:00:00",
    end: "2026-05-03T12:00:00",
  },
  {
    id: "3",
    title: "コードレビュー",
    start: "2026-05-03T15:00:00",
    end: "2026-05-03T15:30:00",
  },
];

export const Default: Story = {
  args: {
    today: mockEvents,
  },
};

export const Empty: Story = {
  args: {
    today: [],
  },
};
