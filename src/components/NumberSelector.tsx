import { Box, Button, Container, Group, Text } from '@mantine/core';
import React from 'react';
import {
  ArrowBack,
  ArrowBarLeft,
  ArrowBarRight,
  ArrowForward,
  Minus,
  Plus
} from 'tabler-icons-react';

interface NumberSelectorProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberSelector = ({ title, value, onChange }: NumberSelectorProps) => {
  return (
    <Box>
      <Text align="center" weight={'bold'}>
        {title}
      </Text>
      <Group
        sx={{
          marginTop: '.5rem'
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
