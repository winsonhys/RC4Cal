import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./calendar";
import NewEvent from "./newEvent";

const routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Calendar} />
      <Route exact path="/new" component={NewEvent} />
    </div>
  </Router>
);

export default routes;
