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
import CategoryVideosContainer from "../containers/CategoryContainer";
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
        <Switch>
          <PrivateRoute exact path="/" component={CategoryVideosContainer} />
          <PrivateRoute
            exact
            path="/categories/:id"
            component={CategoryVideosContainer}
          />
          <PrivateRoute exact path="/videos/:id" component={VideoContainer} />
        </Switch>
      </App>
    </Switch>
  </Router>
);
