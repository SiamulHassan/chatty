import React from "react";
import ReactDOM from "react-dom/client";
import firebaseConfig from "./DbConnection/firebaseConfig";
import "./index.css";
import App from "./App";
// import store
import store from "./Store/store";
// import provider
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
