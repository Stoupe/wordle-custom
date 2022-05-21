import { Group } from '@mantine/core';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import LetterBox from './LetterBox';

export default {
  component: LetterBox,
  title: 'Pattern Library/Letter Box',
  args: {
    tile: { letter: 'a', state: 'unknown' },
    variant: 'large'
  }
} as ComponentMeta<typeof LetterBox>;

export const Default: ComponentStoryObj<typeof LetterBox> = {};

export const Large: ComponentStoryObj<typeof LetterBox> = {
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

export const Small: ComponentStoryObj<typeof LetterBox> = {
  render: () => (
    <Group>
      <LetterBox tile={{ letter: 'a', state: 'correct' }} variant="small" />
      <LetterBox tile={{ letter: 'b', state: 'incorrect' }} variant="small" />
      <LetterBox tile={{ letter: 'c', state: 'wrongLocation' }} variant="small" />
      <LetterBox tile={{ letter: 'd', state: 'unknown' }} variant="small" />
    </Group>
  ),
  parameters: {
    controls: { disable: true }
  }
};
