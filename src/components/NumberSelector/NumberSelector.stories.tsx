import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import NumberSelector from './NumberSelector';

export default {
  component: NumberSelector,
  title: 'Pattern Library/Number Selector',
  args: {
    title: 'Max Guesses',
    initialValue: 10,
    min: 5,
    max: 15
  }
} as ComponentMeta<typeof NumberSelector>;

export const Default: ComponentStoryObj<typeof NumberSelector> = {};

export const NoTitle: ComponentStoryObj<typeof NumberSelector> = {
  args: {
    title: undefined
  }
};
