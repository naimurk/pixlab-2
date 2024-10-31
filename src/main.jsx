import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import { router } from "./Routes/Route/Route";
import { AuthWrapper } from "./context";
ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthWrapper>
      <RouterProvider router={router}></RouterProvider>
    </AuthWrapper>
);
