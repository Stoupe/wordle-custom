import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import App from './App';
import './index.css';
import { store } from './store';

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider>
          <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
            <NotificationsProvider position="top-right">
              <App />
            </NotificationsProvider>
          </MantineProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Main />);
