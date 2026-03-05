import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DateGroup from "./DateGroup";

const meta = {
  component: DateGroup,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DateGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: undefined,
    setDate: () => {},
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DateGroup date={date} setDate={setDate} />;
  },
};
