import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";
import { GameProvider } from "./context/store";

ReactDOM.render(
  <React.StrictMode>
    <NotificationsProvider position="top-right">
      <GameProvider>
        <App />
      </GameProvider>
    </NotificationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
