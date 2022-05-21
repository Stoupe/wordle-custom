import { Center, Space } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { Check, Loader } from 'tabler-icons-react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { GameBoard } from '../containers';
import { HeaderBar } from '../containers/HeaderBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useSeed } from '../hooks/useSeed';
import { selectGameCreationState, setMaxGuesses, setWordLength } from '../state/gameCreationState';
import { generateNewGame, selectGameState } from '../state/gameState';
import constants from '../utils/constants';

const Home = () => {
  const options = useAppSelector(selectGameCreationState);
  const gameState = useAppSelector(selectGameState);
  const { maxGuesses, wordLength, correctWord } = gameState;

  const dispatch = useAppDispatch();

  const { generateSeed } = useSeed();
  const { MIN_WORD_LENGTH, MAX_WORD_LENGTH, MAX_GUESSES, MIN_GUESSES } = constants;

  const [query, setQuery] = useQueryParams({
    g: NumberParam,
    l: NumberParam,
    seed: StringParam
  });

  /**
   * Generate a new game when loaded for the first time
   */
  useEffect(() => {
    showNotification({
      title: 'Generating new game...',
      message: '',
      color: 'blue',
      icon: <Loader />
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
      <HeaderBar />
      <GameBoard gameState={gameState} />
    </Center>
  );
};

export default Home;
