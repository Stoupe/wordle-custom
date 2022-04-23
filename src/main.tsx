import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";
import { GameProvider } from "./context/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <NotificationsProvider position="top-right">
        <GameProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </GameProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
