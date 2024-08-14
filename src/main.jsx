import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./components/routes/homePage.jsx";
import { ConverConfig } from "./components/routes/converConfig.jsx";
import { Root } from "./components/routes/root.jsx";
import { ConversationPage } from "./components/routes/conversationPage.jsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/new-conversation",
        element: <ConversationPage />,
      },
      {
        path: "/conver-config",
        element: <ConverConfig />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
