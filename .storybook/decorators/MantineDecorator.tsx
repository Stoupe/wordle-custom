import { ColorSchemeProvider, MantineProvider, Button, ColorScheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";


export const MantineDecorator = (Story) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right">
          <Button sx={{position: 'absolute', top: 0, right: 0}} variant='subtle' onClick={() => toggleColorScheme(null)}>🌙</Button>
          <Story/>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}