import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Navigation from './Navigation';
import ProtectedRoute from '../AuthRoute/ProtectedRoute';
import SignIn from './SignIn';

export default function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}
