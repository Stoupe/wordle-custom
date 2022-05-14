import { Button, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import {useState} from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};



export const decorators = [
  (Story) => {
    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <Button sx={{position: 'absolute', top: 0, right: 0}} variant='subtle' onClick={() => toggleColorScheme(null)}>🌙</Button>
        <Story/>
      </MantineProvider>
    </ColorSchemeProvider>
  )}
]