import * as Yup from "yup";

export const loginUserSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Email address is invalid"),
  password: Yup.string().required("Password is required"),
});
