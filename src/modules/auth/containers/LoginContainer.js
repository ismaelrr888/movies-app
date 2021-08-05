import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Footer from "../../../components/common/Footer";
import LoginForm from "../components/LoginForm";

export default function LoginContainer() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginForm />
      <Footer />
    </Container>
  );
}
