import React from "react";
import { Switch, Route } from "react-router-dom";
import CategoryView from "../components/views/category";

export default ({ axios }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => <CategoryView {...props} axios={axios} isHome />}
      />
      <Route
        path="/categories/:id"
        render={props => <CategoryView {...props} axios={axios} />}
      />
    </Switch>
  );
};
