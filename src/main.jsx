import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import "./styles/styles.scss";
import { MyProjectApp } from "./MyProjectApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <MyProjectApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
