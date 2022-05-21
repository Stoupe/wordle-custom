import { MantineDecorator } from "./decorators/MantineDecorator";
import { ReduxDecorator } from "./decorators/ReduxDecorator";
import { RouterDecorator } from "./decorators/RouterDecorator";

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
  ReduxDecorator,
  RouterDecorator,
  MantineDecorator,
]
