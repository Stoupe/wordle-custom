import { Button, Center, Container, Text } from '@mantine/core';
import { cleanNotifications } from '@mantine/notifications';
import { useState } from 'react';
import { Refresh } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectGameCreationState } from '../state/gameCreationState';
import { generateNewGame, selectGameState } from '../state/gameState';
import { CreateCustomGameModal } from './CreateCustomGameModal';

export const HeaderBar = () => {
  const options = useAppSelector(selectGameCreationState);
  const { maxGuesses, wordLength } = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  return (
    <Center
      px={'1rem'}
      py={'1rem'}
      sx={({ colorScheme, colors }) => ({
        background: colorScheme === 'dark' ? colors.dark['6'] : colors.gray['3'],
        borderRadius: '1rem',
        minWidth: '32rem',
        justifyContent: 'space-between',
        gap: '3rem'
      })}
    >
      <CreateCustomGameModal isOpen={modalOpen} onClose={closeModal} />

      <Button
        variant="gradient"
        gradient={{ from: 'blue', to: 'purple' }}
        radius={'md'}
        onClick={() => setModalOpen(true)}
      >
        Create Custom Game
      </Button>

      <Container>
        <Text color="grey">Guesses: {maxGuesses}</Text>
        <Text color="grey">Length: {wordLength}</Text>
      </Container>

      {/* <Button color="dark">Share</Button> */}

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
        New Game
      </Button>
    </Center>
  );
};
