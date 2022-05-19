import * as yup from "yup";

export const addressFormSchema = yup
  .object({
    street_name: yup.string().required("Street name is required."),
    town_city: yup.string().required("Town city is required."),
    province: yup.string().required("Province is required."),
    postal_code: yup.string().required("Postal code is required."),
  })
  .required();
