import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./Create.jsx";
import Signup from "./Signup.jsx";
import Sign from "./Sign.jsx";
import Home from "./Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Create",
    element: <Create />,
  },
  {
    path: "/sign_up",
    element: <Signup />,
  },
  {
    path: "/sign_in",
    element: <Sign />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
