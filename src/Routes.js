import React from "react";
import { Route, Switch } from "react-router-dom";
import EntryList from "./components/EntryList";
import Login from "./containers/Login";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={EntryList} />
    <Route path="/login" exact component={Login} />
  </Switch>
);

export default Routes;
