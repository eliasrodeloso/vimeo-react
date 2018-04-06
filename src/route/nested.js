import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/views/home";

export default ({ match, axios }) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home axios={axios} />} />
      <Route
        path="/categories/:id"
        render={({ match }) => {
          console.log(match);
          return <div>{match.params.id}</div>;
        }}
      />
    </Switch>
  );
};
