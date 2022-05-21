import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../../src/store';

export const ReduxDecorator = (Story) => {
    return (
        <ReduxProvider store={store}>
            <Story />
        </ReduxProvider>
    )
}