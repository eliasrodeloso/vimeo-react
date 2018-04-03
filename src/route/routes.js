import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/login/login";
import App from "../components/app/App";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);
