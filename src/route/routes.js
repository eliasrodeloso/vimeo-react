import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/login/login";
import App from "../components/app/App";
import isAuthed from "../components/HOC/isAuthed";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={isAuthed(App)} />
    </Switch>
  </Router>
);
