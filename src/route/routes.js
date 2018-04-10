import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "../components/users/login";
import Register from "../components/users/register";
import App from "../components/app/App";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

const PrivateRoute = connect(mapStateToProps)(
  ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return user.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/users/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  )
);

export default () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={App} isHome />
      <Route path="/users/login" component={Login} />
      <Route path="/users/register" component={Register} />
      <PrivateRoute path="/categories/:id" component={App} />
      <PrivateRoute path="/videos/:id" component={App} />
    </Switch>
  </Router>
);
