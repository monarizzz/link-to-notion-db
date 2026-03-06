import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import CalendarPicker from "./CalendarPicker";

const meta = {
  component: CalendarPicker,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CalendarPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: undefined,
    setDate: () => {},
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    const handleChange = (date: Date | undefined) => {
      console.log(date);
      setDate(date);
    };
    return <CalendarPicker date={date} setDate={handleChange} />;
  },
};
