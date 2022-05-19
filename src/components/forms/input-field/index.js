import React from "react";

import { useFormContext } from "react-hook-form";

export default function FormInput({ label, fieldname, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={fieldname} className="text-left">
        {label}
      </label>

      {errors[fieldname]?.message && (
        <p className="text-sm text-red-500">{errors[fieldname].message}</p>
      )}
      <input {...props} {...register(fieldname)} />
    </>
  );
}
