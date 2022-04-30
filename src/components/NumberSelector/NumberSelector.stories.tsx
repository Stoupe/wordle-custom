import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import NumberSelector from './NumberSelector';

export default {
  component: NumberSelector,
  title: 'Pattern Library/Number Selector',
  args: {
    title: 'Max Guesses',
    value: 10
  }
} as ComponentMeta<typeof NumberSelector>;

export const Default: ComponentStoryObj<typeof NumberSelector> = {};
