import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const ModulesRoutes = () => {
  const classes = useStyles();
  const { checking, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(startChecking());
    } else {
      dispatch(checkingFinish());
    }
  }, [dispatch]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={checking}>
        <h5>Whait...</h5> <CircularProgress color="inherit" />
      </Backdrop>
      <Router>
        <div id="public-route">
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/login" />} />
            <Route exact path="/register" component={RegisterContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <PrivateRoute
              path="/user"
              component={UserLayout}
              isAuthenticated={!!uid}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};
