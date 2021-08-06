import { Avatar, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRDom, useHistory } from "react-router-dom";
import { login } from "../../../actions/auth";
import ButtonProgress from "../../../components/buuton/ButtonProgress";
import { loginUserSchema } from "../validations/loginValidations";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rpassword: "",
    },
    onSubmit: (values, { setErrors }) => {
      dispatch(login(values, history, setErrors));
    },
    validationSchema: loginUserSchema,
  });
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.email && formik.errors.email)}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
          </Grid>
        </Grid>
        <ButtonProgress
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          label="Sign In"
          loading={loading}
        />

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={LinkRDom} to="/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
