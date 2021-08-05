import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ButtonProgress({ loading, label, ...props }) {
  const classes = useStyles();
  return (
    <Button {...props} disabled={loading}>
      {label}
      {loading && <CircularProgress className={classes.progress} size={24} />}
    </Button>
  );
}

ButtonProgress.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
