import Home from "./Containers/Home";
import { Route, Switch } from "react-router-dom";
import React from 'react';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home}></Route>
    </Switch>
  )
}