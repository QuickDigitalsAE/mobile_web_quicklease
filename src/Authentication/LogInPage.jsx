import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from "../services/config.json";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import SubmitButton from '../components/SubmitButton';
import { IoCheckmarkCircle, IoEyeOutline, IoFlashOutline, IoShieldCheckmarkOutline, IoStatsChartOutline } from 'react-icons/io5';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { getTokenSession, setTokenSession } from '../utils/common';

const LogInPage = () => {
  const navigate = useNavigate();
  const [res, apiMethod] = usePost()

  useEffect(() => {
    if (getTokenSession()) {
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
      formdata.append(item, values[item])
    }
    apiMethod("login", formdata)
  };
  useEffect(() => {
    if (res.data) {
      const { status, message, data } = res?.data
      if (status === false) {
        toast.error(message);
      }
      else {
        toast.success(message);
        setTokenSession(data?.api_token)
        navigate("/");
      }
    }
  }, [navigate, res.data])


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
    <div className='login-shell relative'>
      <img src={require("../dist/webImages/login.jpg")} className='absolute inset-0 object-cover w-full h-full' alt="Luxury car" />
      <div className="login-shell__panel">


        <div className="login-shell__formWrap">
          <div className='login-shell__formCard'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
              <Form className="login-shell__form">
                <div className="login-shell__formTop">
                  <div className='logo'>
                    <Link to={`/${config.demo}`}>
                      <img src={require("../dist/webImages/logo.webp")} className='w-[8rem]' alt="QuickLease logo" />
                    </Link>
                  </div>
                  <div className="login-shell__statusPill">
                    <span className="login-shell__statusDot" />
                    Secure access
                  </div>
                </div>

                <div className="login-shell__intro">
                  <span className="login-shell__eyebrow login-shell__eyebrow--solid">Welcome back</span>
                  <h2 className='login-shell__title'>Sign in to your control center</h2>
                  <p className="login-shell__subtitle">Use your account credentials to continue into the admin dashboard and keep operations moving.</p>
                </div>

                <div className="login-shell__featureRow">
                  <div className="login-shell__featureChip">
                    <IoFlashOutline />
                    <span>Fast workflow</span>
                  </div>
                  <div className="login-shell__featureChip">
                    <IoShieldCheckmarkOutline />
                    <span>Protected sessions</span>
                  </div>
                  <div className="login-shell__featureChip">
                    <IoStatsChartOutline />
                    <span>Smart oversight</span>
                  </div>
                </div>

                <div className='inputBox mb-4'>
                  <label htmlFor="" className='capitalize'>Email address</label>
                  <Field name="email" type="text" className='login-shell__input' placeholder='Email address' />
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
                    <Field innerRef={ref} name="password" type="password" className='login-shell__input pr-12' placeholder='Password' />
                    <span className="absolute top-[50%] transform translate-y-[-50%] right-[1rem]">
                      <IoEyeOutline className="text-[1.2rem] cursor-pointer text-[#7d8ca7]" onClick={() => !showPassword ? showPass() : hidePass()} />
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
                <SubmitButton
                  props={{
                    class: "login-shell__submit btn bg-secondary text-white uppercase py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                    text: "Sign In",
                  }}
                  buttonLoading={res.isLoading}
                />

                <div className="login-shell__trustRow">
                  <div className="login-shell__trustItem">
                    <IoCheckmarkCircle />
                    <span>Encrypted credentials</span>
                  </div>
                  <div className="login-shell__trustItem">
                    <IoCheckmarkCircle />
                    <span>Admin-only workspace</span>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
