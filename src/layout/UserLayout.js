import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { startLogout } from "../actions/auth";
import MovieContainer from "../modules/movie/containers/MovieContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function UserLayout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  return (
    <div>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Movies App
            </Typography>
            <Typography variant="h6"> Wlecome: {name}</Typography>
            <IconButton
              arial-label="exit-button"
              color="inherit"
              onClick={() => dispatch(startLogout())}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ padding: 20 }}>
        <Switch>
          <Route path="/user/movies" exact component={MovieContainer} />
        </Switch>
      </div>
    </div>
  );
}
