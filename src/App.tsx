import { Button, Center, Space } from '@mantine/core';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { Check, Refresh } from 'tabler-icons-react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import './App.css';
import GameBoard from './components/GameBoard';
import NumberSelector from './components/NumberSelector';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useSeed } from './hooks/useSeed';
import { selectGameCreationState, setMaxGuesses, setWordLength } from './state/gameCreationState';
import { generateNewGame, selectGameState } from './state/gameState';

const App = () => {
  const options = useAppSelector(selectGameCreationState);
  const { maxGuesses, wordLength, correctWord } = useAppSelector(selectGameState);

  const dispatch = useAppDispatch();

  const { generateSeed } = useSeed();

  const [query, setQuery] = useQueryParams({
    g: NumberParam,
    l: NumberParam,
    seed: StringParam
  });

  const MIN_WORD_LENGTH = 3;
  const MAX_WORD_LENGTH = 15;
  const MIN_GUESSES = 1;
  const MAX_GUESSES = 100;

  /**
   * Generate a new game when loaded for the first time
   */
  useEffect(() => {
    showNotification({
      title: 'Generating new game...',
      message: '',
      color: 'blue'
    });

    const boundNumBetween = (num: number, min: number, max: number) =>
      Math.max(Math.min(num, max), min);

    const queryMaxGuesses = query.g && boundNumBetween(query.g, MIN_GUESSES, MAX_GUESSES);
    const queryWordLength = query.l && boundNumBetween(query.l, MIN_WORD_LENGTH, MAX_WORD_LENGTH);

    const maxGuesses = queryMaxGuesses ?? options.maxGuesses;
    const wordLength = queryWordLength ?? options.wordLength;

    dispatch(
      generateNewGame({
        maxGuesses,
        wordLength,
        seed: query.seed ?? undefined
      })
    );

    queryMaxGuesses && dispatch(setMaxGuesses(queryMaxGuesses));
    queryWordLength && dispatch(setWordLength(queryWordLength));

    // Clear params from the URL
    setQuery({
      g: undefined,
      l: undefined,
      seed: undefined
    });
  }, []);

  useEffect(() => {
    showNotification({
      title: 'New game generated!',
      message: (
        <>
          Length: {wordLength}
          <Space />
          Guesses: {maxGuesses}
          <Space />
          Seed: {generateSeed(correctWord)}
        </>
      ),
      color: 'green',
      icon: <Check />
    });
  }, [correctWord]);

  return (
    <>
      <Center
        sx={({ colorScheme, colors, white }) => ({
          width: '100vw',
          height: '100vh',
          background: colorScheme === 'dark' ? colors.dark['7'] : white,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        })}
      >
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
        <GameBoard />
      </Center>
    </>
  );
};

export default App;
