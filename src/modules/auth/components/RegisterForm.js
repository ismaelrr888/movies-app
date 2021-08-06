import { Avatar, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRDom, useHistory } from "react-router-dom";
import { register } from "../../../actions/auth";
import ButtonProgress from "../../../components/buuton/ButtonProgress";
import { registerUserSchema } from "../validations/registerValidation";

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

export default function RegisterForm() {
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
      dispatch(register(values, history, setErrors));
    },
    validationSchema: registerUserSchema,
  });

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={formik.values.email || ""}
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
              value={formik.values.password || ""}
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="rpassword"
              label="Repeate Password"
              type="password"
              value={formik.values.rpassword || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.rpassword && formik.errors.rpassword)}
              helperText={
                formik.touched.rpassword && formik.errors.rpassword
                  ? formik.errors.rpassword
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
          label="Sign Up"
          loading={loading}
        />

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={LinkRDom} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
