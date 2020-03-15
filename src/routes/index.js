import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../pages/home";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;