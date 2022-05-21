import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import GameBoard from './GameBoard';

export default {
  component: GameBoard,
  title: 'Pattern Library/Game Board',
  args: {
    gameState: {
      blockInput: false,
      cheatMode: false,
      isLoading: false,
      correctWord: 'haylo',
      maxGuesses: 5,
      gameWordList: ['hello, heylo'],
      wordLength: 5,
      gameWon: false,
      gameLost: false,
      currentGuess: [{ letter: 'h', state: 'unknown' }],
      prevGuesses: [
        [
          { letter: 'h', state: 'correct' },
          { letter: 'a', state: 'correct' },
          { letter: 'n', state: 'incorrect' },
          { letter: 'd', state: 'incorrect' },
          { letter: 'y', state: 'wrongLocation' }
        ]
      ]
    }
  }
} as ComponentMeta<typeof GameBoard>;

export const Default: ComponentStoryObj<typeof GameBoard> = {};
