import * as Yup from "yup";
import { Regex } from "../../../utils/regex";

export const registerUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email address is required")
    .email("Email address is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be 8 or more characters")
    .matches(Regex.upperCase, {
      excludeEmptyString: true,
      message: "Password must a uppercase characters",
    })
    .matches(Regex.lowerCase, {
      excludeEmptyString: true,
      message: "Password must a lower case characters",
    })
    .matches(Regex.number, {
      excludeEmptyString: true,
      message: "Password must a number characters",
    })
    .matches(Regex.specialCharacter, {
      excludeEmptyString: true,
      message: "Password must a special characters",
    }),
  rpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password not match with password"
    ),
});
