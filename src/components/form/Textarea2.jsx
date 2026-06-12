import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

function Textarea2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
 <div className="inputBox form-field w-full ">
    {label && <label htmlFor={name} className="form-field__label">{label}{required ? " *" : ""}</label>}
    <textarea
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        ></textarea>

    {  <div className='form-field__error'>
      <ErrorMessage name={name}>
                  {(msg) => <div>{msg}</div>}
        </ErrorMessage>
      </div>}
 </div>
  );
}

export default Textarea2;
