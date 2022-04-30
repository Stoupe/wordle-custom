import { ActionIcon, Button, Center, Container, Group, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Clipboard, Plus, Refresh, Share } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useSeed } from '../hooks/useSeed';
import { selectGameCreationState } from '../state/gameCreationState';
import { generateNewGame, selectGameState } from '../state/gameState';
import { CreateCustomGameModal } from './CreateCustomGameModal';

export const HeaderBar = () => {
  const options = useAppSelector(selectGameCreationState);
  const { maxGuesses, wordLength, correctWord } = useAppSelector(selectGameState);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const clipboard = useClipboard();
  const { generateSeed } = useSeed();

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
        variant="filled"
        color="gray"
        size="sm"
        leftIcon={<Plus />}
        onClick={() => setModalOpen(true)}
      >
        Custom Game
      </Button>

      <Container>
        <Text color="grey">Guesses: {maxGuesses}</Text>
        <Text color="grey">Length: {wordLength}</Text>
      </Container>

      <Group>
        <ActionIcon
          variant="filled"
          size="xl"
          onClick={() => {
            const shareUrl = `${
              window.location.href
            }?g=${maxGuesses}&l=${wordLength}&seed=${generateSeed(correctWord)}`;
            clipboard.copy(shareUrl);
            showNotification({
              title: 'Link Copied to Clipboard',
              message: shareUrl,
              color: 'green',
              icon: <Clipboard />
            });
          }}
        >
          <Share />
        </ActionIcon>

        <ActionIcon
          variant="filled"
          size="xl"
          onClick={() => {
            cleanNotifications();
            dispatch(generateNewGame(options));
          }}
        >
          <Refresh />
        </ActionIcon>
      </Group>
    </Center>
  );
};
