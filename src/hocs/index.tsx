import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (

  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={process.env.UNAUTHORIZATION_URL} />
  )} />
)
export const RoleRoute = ({ component: Component, roles, accessedRoles, ...rest }) => (
  // <Route {...rest} render={(props) => (
  //   <Component {...props} />
  // )} />
  <Route {...rest} render={(props) => {
    for (const accessedRole of accessedRoles) {
      if (roles.includes(accessedRole))
        return <Component {...props} />;
    }
    return <Redirect to='/' />;
  }} />
)