import React from "react";
import { useField, useFormikContext } from "formik"

function Textarea({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="inputBox mt-3">
      {label && (
        <div className="">
          <label className="mb-1 block" htmlFor={name}>{label}</label>
        </div>
      )}
      <div  className="" >
        <textarea
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
}

export default Textarea;