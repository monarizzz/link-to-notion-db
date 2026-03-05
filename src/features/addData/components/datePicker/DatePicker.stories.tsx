import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DatePicker from "./DatePicker";

const meta = {
  component: DatePicker,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: undefined,
    setDate: () => {},
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DatePicker date={date} setDate={setDate} />;
  },
};
