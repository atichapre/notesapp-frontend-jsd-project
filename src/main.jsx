import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MessageProvider } from "../Context/messageContext";
import router from "./router";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <MessageProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </MessageProvider>,
);
