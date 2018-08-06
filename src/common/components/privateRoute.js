import React from "react"
import PropTypes from "prop-types"
/*global sessionStorage */
import { Route, Redirect } from "react-router-dom"
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return sessionStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }, // Need to find a way to set propType validation for this.
          }}
        />
      )
    }}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default PrivateRoute
