import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import RegisterContainer from "../containers/RegisterContainer";
import LoginContainer from "../containers/LoginContainer";
import CategoryContainer from "../containers/CategoryContainer";
import VideoContainer from "../containers/VideoContainer";
import App from "../components/app/App";

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
      <Route path="/users/login" component={LoginContainer} />
      <Route path="/users/register" component={RegisterContainer} />
      <App>
        <PrivateRoute exact path="/" component={CategoryContainer} isHome />
        <PrivateRoute path="/categories/:id" component={CategoryContainer} />
        <PrivateRoute path="/videos/:id" component={VideoContainer} />
      </App>
    </Switch>
  </Router>
);
