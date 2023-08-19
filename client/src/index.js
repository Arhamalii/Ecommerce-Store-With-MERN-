import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { SearchPovider } from "./context/search";
import { CartPovider } from "./context/Cart";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchPovider>
      <CartPovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartPovider>
    </SearchPovider>
  </AuthProvider>
);
