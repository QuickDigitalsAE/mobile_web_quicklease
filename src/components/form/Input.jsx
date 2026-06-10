import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

function Input({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
 <div className="inputBox mt-3">
    {label && <label htmlFor={label} className="mb-1 block">{label}</label>}
    <input  error={errors[name]}   id={label} {...field} {...rest} />

    {  <div className='my-1'>
      <ErrorMessage name={name}>
                  {(msg) => (
                    <div style={{ color: "red", whiteSpace: "nowrap" }}>
                      {msg}
                    </div>
                  )}
        </ErrorMessage>
      </div>}
 </div>
  );
}

export default Input;
