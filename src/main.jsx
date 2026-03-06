import "@/styles/styles.scss";
import "@/styles/tailwind.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntApp, ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import notificationConfig from "./configs/notificationConfig.js";
import theme from "./configs/theme.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <AntApp notification={notificationConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
);
