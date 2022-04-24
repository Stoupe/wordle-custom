import { Button, Container, Group, Modal, Text, TextInput } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { Clipboard } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useSeed } from '../hooks/useSeed';
import {
  selectGameCreationState,
  setCustomWord,
  setMaxGuesses,
  setWordLength
} from '../state/gameCreationState';
import { generateNewGame, selectGameState } from '../state/gameState';
import constants from '../utils/constants';
import NumberSelector from './NumberSelector';

export const CreateCustomGameModal = ({
  onClose,
  isOpen
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectGameCreationState);
  const { maxGuesses, wordLength } = useAppSelector(selectGameState);
  const clipboard = useClipboard();
  const { MIN_GUESSES, MAX_GUESSES, MIN_WORD_LENGTH, MAX_WORD_LENGTH } = constants;
  const { generateSeed } = useSeed();

  const handleCreate = () => {
    dispatch(generateNewGame(options));
    onClose();
  };

  const handleShare = () => {
    const params = new URLSearchParams({
      g: String(options.maxGuesses),
      l: String(options.wordLength)
    });

    if (options.customWord) {
      params.set('seed', generateSeed(options.customWord));
    }

    const url = window.location.href + '?' + params;
    showNotification({
      title: 'Link Copied to Clipboard',
      message: url,
      color: 'green',
      icon: <Clipboard />
    });
    clipboard.copy(url);
  };

  return (
    <Modal
      centered
      title="Create a Custom Game"
      onClose={() => {
        // Reset new game options state on close
        dispatch(setCustomWord(''));
        dispatch(setMaxGuesses(maxGuesses));
        dispatch(setWordLength(wordLength));

        onClose();
      }}
      opened={isOpen}
    >
      <Container>
        <NumberSelector
          title="Max Guesses"
          value={options.maxGuesses}
          onChange={(newMaxGuesses) =>
            newMaxGuesses >= MIN_GUESSES &&
            newMaxGuesses <= MAX_GUESSES &&
            dispatch(setMaxGuesses(newMaxGuesses))
          }
        />

        <NumberSelector
          title="Word Length"
          value={options.wordLength}
          onChange={(newLength) =>
            newLength <= MAX_WORD_LENGTH &&
            newLength >= MIN_WORD_LENGTH &&
            dispatch(setWordLength(newLength))
          }
        />

        <Text weight="bold" mt="1rem" mb="0.5rem">
          Custom Word (optional)
        </Text>
        <TextInput onChange={(e) => dispatch(setCustomWord(e.target.value))} />

        <Group mt={'3rem'}>
          <Button color="gray" sx={{ flexGrow: 1 }} onClick={handleShare}>
            Share
          </Button>
          <Button sx={{ flexGrow: 1 }} onClick={handleCreate}>
            Create
          </Button>
        </Group>
      </Container>
    </Modal>
  );
};
