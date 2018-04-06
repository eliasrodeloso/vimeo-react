import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/users/login";
import Register from "../components/users/register";
import App from "../components/app/App";
import isAuthed from "../components/HOC/isAuthed";

export default () => (
  <Router>
    <Switch>
      <Route path="/" component={isAuthed(App)} />
      <Route path="/users/login" component={Login} />
      <Route path="/users/register" component={Register} />
    </Switch>
  </Router>
);
