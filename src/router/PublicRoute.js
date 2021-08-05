import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to="/movies" /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
