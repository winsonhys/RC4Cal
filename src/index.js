import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import Calendar from "./events";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store()}>
    <Calendar />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
