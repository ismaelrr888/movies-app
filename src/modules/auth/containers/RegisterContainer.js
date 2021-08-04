import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Footer from "../../../components/common/Footer";
import RegisterForm from "../components/RegisterForm";

export default function RegisterContainer() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <RegisterForm />
      <Footer />
    </Container>
  );
}
