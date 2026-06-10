import React from "react";
import { useField, useFormikContext } from "formik"

function Textarea({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="inputBox form-field">
      {label && (
        <label className="form-field__label" htmlFor={name}>{label}{required ? " *" : ""}</label>
      )}
      <textarea
        id={name}
        error={errors[name]}
        {...field}
        {...rest}
      ></textarea>
    </div>
  );
}

export default Textarea;
