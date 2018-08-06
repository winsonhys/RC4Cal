import React from "react"
import Calendar from "./calendar"
import NewEvent from "./newEvent"
import EditEvent from "./editEvent"
import PrivateRoute from "../common/components/privateRoute"
import SuccessfulSwap from "./eventSwap/successfulSwap"
import { Route } from "react-router-dom"

const routes = () => (
  <div>
    <PrivateRoute exact path="/calendar" component={Calendar} />
    <PrivateRoute exact path="/new" component={NewEvent} />
    <PrivateRoute exact path="/edit" component={EditEvent} />
    <Route path="/successfulSwap" component={SuccessfulSwap} />
  </div>
)

export default routes
