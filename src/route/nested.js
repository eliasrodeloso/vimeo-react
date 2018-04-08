import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/views/home";
import CategoryView from "../components/views/category";

export default ({ axios }) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home axios={axios} />} />
      <Route
        path="/categories/:id"
        render={props => <CategoryView {...props} axios={axios} />}
      />
    </Switch>
  );
};
