import { Button, Center } from '@mantine/core';
import { cleanNotifications } from '@mantine/notifications';
import { Refresh } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectGameCreationState, setMaxGuesses, setWordLength } from '../state/gameCreationState';
import { generateNewGame } from '../state/gameState';
import constants from '../utils/constants';
import NumberSelector from './NumberSelector';

export const HeaderBar = () => {
  const options = useAppSelector(selectGameCreationState);
  const dispatch = useAppDispatch();

  const { MIN_WORD_LENGTH, MAX_WORD_LENGTH, MAX_GUESSES, MIN_GUESSES } = constants;

  return (
    <Center
      px={'1rem'}
      py={'1rem'}
      sx={({ colorScheme, colors }) => ({
        background: colorScheme === 'dark' ? colors.dark['6'] : colors.gray['3'],
        borderRadius: '1rem',
        width: '32rem',
        justifyContent: 'space-between',
        gap: '1rem'
      })}
    >
      <NumberSelector
        title="Letters"
        value={options.wordLength}
        onChange={(newLength) =>
          newLength <= MAX_WORD_LENGTH &&
          newLength >= MIN_WORD_LENGTH &&
          dispatch(setWordLength(newLength))
        }
      />
      <NumberSelector
        title="Guesses"
        value={options.maxGuesses}
        onChange={(newMaxGuesses) =>
          newMaxGuesses >= MIN_GUESSES &&
          newMaxGuesses <= MAX_GUESSES &&
          dispatch(setMaxGuesses(newMaxGuesses))
        }
      />
      <Button
        variant="filled"
        radius="md"
        color="dark"
        rightIcon={<Refresh />}
        onClick={() => {
          cleanNotifications();
          dispatch(generateNewGame(options));
        }}
      >
        Generate
      </Button>
    </Center>
  );
};
