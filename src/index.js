import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calendar from "./calendar/calendar";
import SomeRandomPage from "./logInPage";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<SomeRandomPage />, document.getElementById("root"));
registerServiceWorker();
