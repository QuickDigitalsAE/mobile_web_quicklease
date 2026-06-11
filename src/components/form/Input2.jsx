import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

function Input2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
 <div className="inputBox form-field w-full mt-3">
    {label && <label htmlFor={name} className="form-field__label">{label}{required ? " *" : ""}</label>}
    <input error={errors[name]} id={name} {...field} {...rest} />

    {  <div className='form-field__error'>
      <ErrorMessage name={name}>
                  {(msg) => <div>{msg}</div>}
        </ErrorMessage>
      </div>}
 </div>
  );
}

export default Input2;
