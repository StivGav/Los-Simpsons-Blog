import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { StoreProvider } from "./hooks/useGlobalReducer";

import "./index.css";

const Main = () => {
  return (
    <React.StrictMode>

      <StoreProvider>

        <RouterProvider router={router} />

      </StoreProvider>

    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Main />
);
