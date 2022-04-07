import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <NotificationsProvider position="top-right">
      <App />
    </NotificationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
