import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./frontPage";
import Events from "./events";

const routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={LoginPage} />
      {/* <Route exact path="/events" component={Events} /> */}
      <Events />
    </div>
  </Router>
);

export default routes;
