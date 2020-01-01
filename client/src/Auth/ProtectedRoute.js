import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from './Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
);

export default ProtectedRoute;
