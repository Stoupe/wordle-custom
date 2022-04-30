import { Group } from '@mantine/core';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import LetterBox from './LetterBox';

export default {
  component: LetterBox,
  title: 'Pattern Library/Letter Box',
  args: {
    tile: { letter: 'a', state: 'unknown' }
  }
} as ComponentMeta<typeof LetterBox>;

export const Default: ComponentStoryObj<typeof LetterBox> = {};

export const AllCases: ComponentStoryObj<typeof LetterBox> = {
  render: () => (
    <Group>
      <LetterBox tile={{ letter: 'a', state: 'correct' }} />
      <LetterBox tile={{ letter: 'b', state: 'incorrect' }} />
      <LetterBox tile={{ letter: 'c', state: 'wrongLocation' }} />
      <LetterBox tile={{ letter: 'd', state: 'unknown' }} />
    </Group>
  ),
  parameters: {
    controls: { disable: true }
  }
};
