import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RegisterContainer from "../modules/auth/containers/RegisterContainer";
import { PublicRoute } from "../router/PublicRoute";

export const ModulesRoutes = () => {
  const { checking, uid } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/register"
            component={RegisterContainer}
            isAuthenticated={!!uid}
          />
        </Switch>
      </div>
    </Router>
  );
};
