import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import Calendar from "./calendar/calendar";
import WrappedLoginForm from "./FrontPage/Login"
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store()}>
    <WrappedLoginForm/>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
