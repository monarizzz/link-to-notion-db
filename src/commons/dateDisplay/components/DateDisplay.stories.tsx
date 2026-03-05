import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DateDisplay from "./DateDisplay";

const meta = {
  component: DateDisplay,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DateDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: undefined,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DateDisplay date={date} />;
  },
};
