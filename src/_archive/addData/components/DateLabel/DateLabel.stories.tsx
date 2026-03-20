import type { Meta, StoryObj } from "@storybook/react-vite";

import DateLabel from "./DateLabel";

const meta = {
  component: DateLabel,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = new Date();
const daysOffset = (n: number) => {
  const d = new Date(today);
  d.setDate(today.getDate() + n);
  return d;
};

export const All: Story = {
  args: { date: daysOffset(0) },
  render: () => (
    <div className="flex flex-col gap-2 p-6 w-60">
      <DateLabel date={daysOffset(0)} />
      <DateLabel date={daysOffset(1)} />
      <DateLabel date={daysOffset(-1)} />
      <DateLabel date={daysOffset(7)} />
      <DateLabel date={daysOffset(-7)} />
      <DateLabel date={daysOffset(21)} />
      <DateLabel date={daysOffset(-21)} />
    </div>
  ),
};

export const Today: Story = { args: { date: daysOffset(0) } };
export const Tomorrow: Story = { args: { date: daysOffset(1) } };
export const Yesterday: Story = { args: { date: daysOffset(-1) } };
export const NextWeek: Story = { args: { date: daysOffset(7) } };
export const LastWeek: Story = { args: { date: daysOffset(-7) } };
export const Future: Story = { args: { date: daysOffset(21) } };
export const Past: Story = { args: { date: daysOffset(-21) } };
