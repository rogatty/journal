import React from "react";
import { Switch } from "react-router-dom";
import EntryList from "./components/EntryList";
import Login from "./containers/Login";
import RouteWithProps from "./components/RouteWithProps";

const Routes = ({ childProps }) => (
  <Switch>
    <RouteWithProps path="/" exact component={EntryList} props={childProps} />
    <RouteWithProps path="/login" exact component={Login} props={childProps} />
  </Switch>
);

export default Routes;
