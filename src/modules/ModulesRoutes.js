import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { checkingFinish, startChecking } from "../actions/auth";
import UserLayout from "../layout/UserLayout";
import LoginContainer from "../modules/auth/containers/LoginContainer";
import RegisterContainer from "../modules/auth/containers/RegisterContainer";
import { PrivateRoute } from "../router/PrivateRoute";
import { PublicRoute } from "../router/PublicRoute";

export const ModulesRoutes = () => {
  const { checking, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(startChecking());
    } else {
      dispatch(checkingFinish());
    }
  }, [dispatch]);

  if (checking) {
    return <h5>Whait...</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/login" />} />
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
          <PrivateRoute
            path="/user"
            component={UserLayout}
            isAuthenticated={!!uid}
          />
        </Switch>
      </div>
    </Router>
  );
};
