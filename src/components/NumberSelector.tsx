import { Box, Button, Group, Text } from '@mantine/core';
import { Minus, Plus } from 'tabler-icons-react';

interface NumberSelectorProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberSelector = ({ title, value, onChange }: NumberSelectorProps) => {
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
        <Button compact color={'dark'} onClick={() => onChange(value - 1)}>
          <Minus />
        </Button>
        <Text>{value ?? '?'}</Text>
        <Button compact color={'dark'} onClick={() => onChange(value + 1)}>
          <Plus />
        </Button>
      </Group>
    </Box>
  );
};

export default NumberSelector;
