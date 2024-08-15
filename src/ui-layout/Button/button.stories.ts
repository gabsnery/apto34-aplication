import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Main/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Botão",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Botão",
  },
};
export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Botão",
  },
};
