import React, { useContext, useEffect, useRef, useState } from "react";
import profile from "./dist/webImages/profile.webp";
import camera from "./dist/webImages/camera.svg";
import swal from "sweetalert";
import FormControl from "./components/form/FormControl";
import {  Field, Form, Formik } from "formik";
import SubmitButton from "./components/SubmitButton";
import { useNavigate, useParams } from 'react-router-dom';
import { MainLanguageContext } from "./context/MainLanguageContext";
import useFetch from "./customHooks/useFetch";
import useGet from "./customHooks/useGet";
import usePost from "./customHooks/usePost";
import { toast } from "react-toastify";
import * as yup from "yup";
import { MainProfileContext } from "./context/MainProfileContext";
import SkeletonCreateEdits from "./Users/SkeletonCreateEdits";

const Profile = () => {
    const { handleProfileData,profileData } = useContext(MainProfileContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState("")
    const { mainLanguage } = useContext(MainLanguageContext);
    const [resget, apiMethodGet] = useGet()

    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`roles`);
        }
    }, [mainLanguage]);
    const [datas2, setDatas2] = useState("")
    const [imgValue, setiImgValue] = useState();
    const [imgPath, setImgPath] = useState();
    useEffect(() => {
        if (profileData) {
            setDatas2(profileData);
            setRole(profileData?.role_id)
            setImgPath(profileData?.profile_image)
        }
    }, [profileData]);
    const [datas, setDatas] = useState("")
    useEffect(() => {
        if (resget.data) {
            setLoading(false);
            setDatas(resget.data?.data)
        }
    }, [resget.data])

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file?.type?.includes("image")) {
                let path = (window.URL || window.webkitURL).createObjectURL(file);
                setImgPath(path);
                setiImgValue(file);
            } else {
                swal("Only use Image", "", "warning");
            }
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        if (
            e.dataTransfer.files[0] &&
            e.dataTransfer.files[0]?.type?.includes("image")
        ) {
            let path = (window.URL || window.webkitURL).createObjectURL(
                e.dataTransfer.files[0]
            );
            setImgPath(path);
            const file = e.dataTransfer.files[0];
            setiImgValue(file);
        } else {
            swal("Only use Image", "", "warning");
        }
    };

    // password_confirmation
    const validationSchema = yup.object({
        email: yup.string().email("Invalid Email").required("Required")
      });
    const requireFeild = ["username", "email","user_enabled"];
    const [res, apiMethod] = usePost();
    const handleSubmit = async (values) => {
        let formdata = new FormData();
        let requireFeildSwal = {
            username: "Name",
            email: "Email",
          };
        let checkerRequried = [];
        for (const item in values) {
            if (requireFeild.includes(item) && values[item] === "") {
              checkerRequried.push(requireFeildSwal[item]);
            }
            formdata.append(item, values[item]);
          }
          formdata.append("role_id", role);
          formdata.append("profile_image", imgValue ?? "");
          if (!imgPath) {
            checkerRequried.push("Profile Image");
          }
        //   if (!role) {
        //     checkerRequried.push("Role");
        //   }

        if (checkerRequried.length > 0) {
            swal({
                title: "Required Fields are empty! Please fill and try again",
                text: checkerRequried.join(","),
                icon: "error",
                dangerMode: true,
            });
        }
        else {
            apiMethod(`userUpdate/${profileData?.id}`, formdata)
        }
    };
    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data
            if (status === false) {
                toast.error(message);
            }
            else {
                // navigate("/users")
                toast.success(message);
            }
        }
    }, [res.data])

    if (loading || !profileData) return <SkeletonCreateEdits heading={"Profile"} />;
    let user_enabled = []
    user_enabled.push(String(profileData?.user_enabled))
    let initialValues = {
        username: profileData?.name,
        email: profileData?.email,
        password: "",
        password_confirmation: "",
        user_enabled: user_enabled,
    };
    return (
        <div className='createTeam  '>
<div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-2'>
                <div className={`TeamModel  transition-all duration-300  bg-white rounded-xl`} >
                    <div className=" overflow-auto modelBox">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
                            <Form name="myForm">
                                <div className="TeamBox p-5 rounded-xl">
                                    <div
                                        className="w-[5rem] h-[5rem] relative mt-4"
                                        onDrop={handleDrop}
                                    >
                                        <img
                                            src={imgPath || profile}
                                            className="w-full h-full rounded-3xl object-cover border-2 border-[#C0CCE2]"
                                            alt=""
                                        />
                                        <div className="TeamBoxinput w-[2rem] h-[2rem] bg-[#C0CCE2] grid place-items-center rounded-full absolute right-[-1rem] top-[-1rem] cursor-pointer z-1">
                                            <input
                                                type="file"
                                                onChange={handleFileUpload}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <img src={camera} alt="camera" className="cursor-pointer" />
                                        </div>
                                    </div>

                                    <div className="form mt-7">

                                        <FormControl
                                            name="username"
                                            label={"User Name"}
                                            placeholder="Enter your Name"
                                            className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                            control="input"
                                            type="text"
                                        />
                                        {
                                          profileData?.role_id != 1 ?
                                          <FormControl
                                          name="email"
                                          label={"User Email"}
                                          placeholder="Enter your Email"
                                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                          control="input"
                                          type="email"
                                      />
                                      
                                        :
                                        <FormControl
                                          name="email"
                                          label={"User Email"}
                                          placeholder="Enter your Email"
                                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                          control="input"
                                          type="email" 
                                          disabled={true}
                                          />
                                            }
                                        
                                        
                                     {profileData?.role_id != 1 &&   <div className="inputBox mt-3">
                                            <label htmlFor="User Email" className="mb-1 block">Role </label>
                                            <select value={role} onInput={(e) => setRole(e.target.value)} className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" name="role_id" id="">
                                                <option value="">Role</option>
                                                {Array.isArray(datas) && datas.map((item) => {
                                                    const { id, name } = item
                                                    return (
                                                        <option value={id} key={id}>{name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>}
                                        <FormControl
                      name="password"
                      label="Password"
                      placeholder="Enter your Password"
                      className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                      control="password"
                      type="password"
                    />

                    <FormControl
                      name="password_confirmation"
                      label="Confirm Password"
                      placeholder="Confirm your Password"
                      className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                      control="password"
                      type="password"
                    />
                                        <div className="flex items-center mt-4">
                      <Field name="user_enabled" id="default-checkbox" type="checkbox"  value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
                    </div>

                                    </div>
                                </div>
                                <ul className="list flex justify-end gap-4 items-center pb-6 px-5">
                                    <li className="">
                                        {(
                                            <SubmitButton
                                                props={{
                                                    class:
                                                        "btn bg-secondary text-white  uppercase   py-3 px-8 rounded-full w-full block submit hover:bg-primary transition-all duration-300",
                                                    text: "Submit",
                                                }}
                                                buttonLoading={res.isLoading}
                                            />
                                        )}
                                    </li>
                                </ul>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
