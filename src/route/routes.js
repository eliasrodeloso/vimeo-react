import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import RegisterView from "../containers/views/users/register/RegisterView";
import CategoryView from "../containers/views/category/CategoryView";
import LoginView from "../containers/views/users/login/LoginView";
import VideoView from "../containers/views/video/VideoView";
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
      <Route path="/users/login" component={LoginView} />
      <Route path="/users/register" component={RegisterView} />
      <App>
        <PrivateRoute exact path="/" component={CategoryView} isHome />
        <PrivateRoute path="/categories/:id" component={CategoryView} />
        <PrivateRoute path="/videos/:id" component={VideoView} />
      </App>
    </Switch>
  </Router>
);
