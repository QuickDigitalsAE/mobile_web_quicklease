import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

function Textarea2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
 <div className="inputBox w-full mt-3">
    {label && <label htmlFor={label} className="mb-1 block text-[#7D8CA7] text-[.8rem]">{label}</label>}
    <textarea
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        ></textarea>

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

export default Textarea2;
