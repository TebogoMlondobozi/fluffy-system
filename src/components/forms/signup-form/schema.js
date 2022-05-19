import * as yup from "yup";

export const signupFormSchema = yup
  .object({
    firstname: yup.string().required("First name is required."),
    lastname: yup.string().required("Last name is required."),
    mobile_number: yup.string().required("Mobile number is required."),
    email_address: yup
      .string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  })
  .required();
