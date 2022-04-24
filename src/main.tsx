import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider>
        <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
          <NotificationsProvider position="top-right">
            <Provider store={store}>
              <Routes>
                <Route path="/" element={<App />} />
              </Routes>
            </Provider>
          </NotificationsProvider>
        </MantineProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
