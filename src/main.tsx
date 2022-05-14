import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import App from './App';
import './index.css';
import { store } from './store';

// React 18
// import { createRoot } from 'react-dom/client';

if (!import.meta.env.PROD) {
  const { default: axe } = await import('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider>
          <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
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
ReactDOM.render(<Main />, container);

// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(<Main />);
