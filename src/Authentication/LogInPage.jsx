import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from "../services/config.json";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import SubmitButton from '../components/SubmitButton';
import { IoEyeOutline } from 'react-icons/io5';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { getTokenSession, setTokenSession } from '../utils/common';

const LogInPage = () => {
  const navigate = useNavigate();
  const [res, apiMethod] = usePost()

  useEffect(() => {
    if(getTokenSession()) {
      navigate(`/${config.demo}`)
    }
  }, [navigate])
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().min(8, "Minimum 8 characters").max(20, "Maximum 20 characters").required("Required")
  });

  const handleSubmit = (values) => {
    let formdata = new FormData();
    for (const item in values) {
      formdata.append(item,values[item])
    }
    apiMethod("login",formdata)
  };
  useEffect(() => {
    if(res.data) {
      const {status,message,data} = res?.data
      if(status === false) {
        toast.error(message);
      }
      else {
        toast.success(message);
        setTokenSession(data?.api_token)
        navigate("/");
      }
    }
  }, [res.data])
  

  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const hidePass = () => {
    if (ref.current) {
      ref.current.type = "password";
      setShowPassword(false);
    }
  };

  const showPass = () => {
    if (ref.current) {
      ref.current.type = "text";
      setShowPassword(true);
    }
  };

  return (
    <div className='loginPage h-svh overflow-hidden grid grid-cols-[4fr,6fr] max-lg:grid-cols-1 items-center gap-14 px-4'>
      <div className="loginPage__left h-svh max-lg:hidden relative">
        <div className="loginPage__left- w-[37.375rem] h-[37.375rem] bg-secondary opacity-[.6] blur-[247px] absolute left-[-50%] top-[-50%]"></div>
        <div className='loginPage__leftBox rounded-full overflow-hidden relative h-full'>
          <img src={require("../dist/webImages/loginImage.png")} className='w-full h-full  object-cover' alt="" />
          <div className="loginPage__leftBox-txt left-0 right-0 mx-auto w-[80%] leading-[1] absolute top-[50%] transform translate-y-[-50%] text-center text-white">
            <h1 className='m-0 font-MluvkaLight text-[5.125rem] uppercase'>Book Your <b>Car</b></h1>
          </div>
        </div>
      </div>
      {/* close loginPage__left  */}
      <div className="loginPage__Right relative ">
        <div className="loginPage__Right- bg-[#FFD6E0] absolute right-[-50%] bottom-[-100%] w-[45rem] h-[45rem] blur-[247px] z-[-1]"></div>
        <div className='loginPage__Rightt w-[50%] mx-auto'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
            <Form>
              <div className='logo mb-6'>
                <Link to={`/${config.demo}`}>
                  <img src={require("../dist/webImages/logo.webp")} className='w-[8rem] mx-auto' alt="logo.png" />
                </Link>
              </div>
              <h2 className='font-Poppins text-[3.063rem] pl-5 relative leading-[1] mb-5 font-bold '>Login</h2>
              <div className='inputBox mb-4'>
                <label htmlFor="" className='capitalize'>Email address</label>
                <Field name="email" type="text" className='border border-[#D9D9D9] h-[2.8rem] outline-none rounded-full w-full px-4' placeholder='email address' />
                <div className='my-1'>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className='inputBox'>
                <label htmlFor="" className='capitalize'>Password</label>
                <div className='relative'>
                  <Field innerRef={ref} name="password" type="password" className='border border-[#D9D9D9] h-[2.8rem] outline-none rounded-full w-full px-4' placeholder='Password' />
                  <span className="absolute top-[50%] transform translate-y-[-50%] right-[1rem]">
                    <IoEyeOutline className="text-[1.2rem] cursor-pointer" color={"#cdcdcd"} onClick={() => !showPassword ? showPass() : hidePass()} />
                  </span>
                </div>
                <div className='my-1'>
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              {/* <Link className='forget w-full block text-right hover:text-secondary transition-all duration-300'>Forgot Password</Link> */}
              <SubmitButton
                props={{
                  class: "btn bg-secondary text-white px-24 uppercase py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                  text: "Sign In",
                }}
                buttonLoading={res.isLoading}
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
