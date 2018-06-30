import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./calendar";
import NewEvent from "./newEvent";
import EditEvent from "./editEvent";

const routes = () => (
  <div>
    <Route exact path="/calendar" component={Calendar} />
    <Route exact path="/new" component={NewEvent} />
    <Route exact path="/edit" component={EditEvent} />
  </div>
);

export default routes;
