import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./calendar";
import NewEvent from "./newEvent";

const routes = () => (
  <div>
    <Route exact path="/calendar" component={Calendar} />
    <Route exact path="/new" component={NewEvent} />
  </div>
);

export default routes;
