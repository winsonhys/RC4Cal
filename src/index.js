import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import Main from "./routes";

ReactDOM.render(
  <Provider store={store()}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
