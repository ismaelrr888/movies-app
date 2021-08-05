import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginContainer from "../modules/auth/containers/LoginContainer";
import RegisterContainer from "../modules/auth/containers/RegisterContainer";
import { PublicRoute } from "../router/PublicRoute";

export const ModulesRoutes = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }

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
          <PublicRoute
            exact
            path="/login"
            component={LoginContainer}
            isAuthenticated={!!uid}
          />
        </Switch>
      </div>
    </Router>
  );
};
