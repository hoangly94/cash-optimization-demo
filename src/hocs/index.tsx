import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
// import { State as AuthState } from '~/stores/auth/constants';
import Config from '@config';

export const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (

  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={Config.unAuthenticatedUrl} />
  )} />
)
export const RoleRoute = ({ component: Component, roles, accessedRole, ...rest }) => (
  <Route {...rest} render={(props) => (
    <Component {...props} />
  )} />
  // <Route {...rest} render={(props) => (
  //   roles.includes(accessedRole)
  //     ? <Component {...props} />
  //     : <Redirect to='/' />
  // )} />
)