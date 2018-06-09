import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import Calendar from "./calendar/calendar";
import SomeRandomPage from "./logInPage";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store()}>
    <SomeRandomPage />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
