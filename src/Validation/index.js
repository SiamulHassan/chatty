import * as Yup from "yup";

export const signUp = Yup.object({
  fullName: Yup.string().min(3).max(15).required("Type Your Name"),
  email: Yup.string().required("you missed email field"),
  password: Yup.string().required("You Missed Password Field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Did not match")
    .required("You Missed Confirm Password"),
});
