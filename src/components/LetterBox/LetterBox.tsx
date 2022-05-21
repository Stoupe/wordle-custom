import { Box, CSSObject, MantineTheme, Text, Transition } from '@mantine/core';
import { Tile } from '../../models/gameState';

interface LetterBoxProps {
  tile: Tile | undefined;
  variant?: 'large' | 'small';
}

/**
 * Represents a single letter box in the game board.
 * If tile is undefined, a blank letter box is rendered.
 * @returns
 */
const LetterBox = ({ tile, variant = 'large' }: LetterBoxProps) => {
  const useLetterBoxStyles = (theme: MantineTheme): CSSObject => ({
    background:
      tile?.state === 'correct'
        ? theme.colors.green
        : tile?.state === 'wrongLocation'
        ? theme.colors.orange['6']
        : tile?.state === 'incorrect'
        ? theme.fn.darken(theme.colors.gray['7'], 0.15)
        : theme.colors.gray['7'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5rem',

    ...(variant === 'large'
      ? {
          width: '2rem',
          height: '2rem',
          padding: '2rem'
        }
      : variant === 'small'
      ? {
          width: '1rem',
          height: '1rem',
          padding: '1rem'
        }
      : {})
  });

  return (
    <Box sx={(theme) => useLetterBoxStyles(theme)}>
      <Transition transition={'pop'} duration={200} mounted={tile?.letter !== undefined}>
        {(style) => (
          <Text
            style={style}
            sx={{
              fontSize: !tile ? '0' : variant === 'large' ? '2rem' : '1rem'
              // transition: "font-size 0.1s",
            }}
            weight={'bold'}
            color={'white'}
          >
            {tile?.letter?.toLocaleUpperCase()}
          </Text>
        )}
      </Transition>
    </Box>
  );
};

export default LetterBox;
