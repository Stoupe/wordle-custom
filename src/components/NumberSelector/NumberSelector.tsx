import { Box, Button, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Minus, Plus } from 'tabler-icons-react';

interface NumberSelectorProps {
  title: string;
  onChange: (value: number) => void;
  initialValue?: number;
  min?: number;
  max?: number;
}

const NumberSelector = ({ title, initialValue = 0, min, max, onChange }: NumberSelectorProps) => {
  const [val, setVal] = useState(initialValue);

  const incrementVal = () =>
    setVal((current) => {
      if (max === undefined) return current;
      if (current + 1 > max) return current;
      return current + 1;
    });

  const decrementVal = () =>
    setVal((current) => {
      if (min === undefined) return current;
      if (current - 1 < min) return current;
      return current - 1;
    });

  useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginTop: '1rem'
      }}
    >
      <Text weight={'bold'}>{title}</Text>
      <Group
        sx={{
          marginTop: '0.5rem'
        }}
      >
        <Button compact color={'dark'} onClick={decrementVal}>
          <Minus />
        </Button>
        <Text>{val}</Text>
        <Button compact color={'dark'} onClick={incrementVal}>
          <Plus />
        </Button>
      </Group>
    </Box>
  );
};

export default NumberSelector;
