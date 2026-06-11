import React, { useRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { IoEyeOutline } from "react-icons/io5";

function Password({ name,required,mustrequried, label , ...rest}) {
  const ref = useRef(0);
  let showPassword = false
  const hidePass = (e) =>{
    ref.current.type = "password"
    showPassword = false
  }
  const showPass = (e)=>{
  ref.current.type = "text"
    showPassword = true
  }
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <>
    <div className="inputBox form-field relative mt-3">
       <label htmlFor={name} className="form-field__label">{label}{required ? " *" : ""}</label>
      <div className="password relative">
        <input
          id={name}
          error={errors[name]}
          autoComplete="off"
          ref={ref}
          type="password" 
          {...field}
          {...rest}
          />
        <span className="absolute top-[50%] transform translate-y-[-50%] right-[1rem]"> 
        <IoEyeOutline className="text-[1.2rem] cursor-pointer" color={"#cdcdcd"}  onClick={(e)=> !showPassword ? showPass(e) : hidePass(e)}  />
        </span>
      </div>
    </div>
    {mustrequried && <p className="mustrequried">Must be at least 8 characters.</p>}
    {  <div className='form-field__error'>
      <ErrorMessage name={name}>
                  {(msg) => <div>{msg}</div>}
        </ErrorMessage>
      </div>}
          </>
  );
}

export default Password;
