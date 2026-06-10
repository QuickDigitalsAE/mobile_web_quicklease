import React, { useEffect, useState } from "react";
import profile from "../dist/webImages/profile.webp";
import camera from "../dist/webImages/camera.svg";
import swal from "sweetalert";
import FormControl from "../components/form/FormControl";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate, useParams } from 'react-router-dom';
import back from "../dist/webImages/back.svg";
import SkeletonCreateEdits from "./SkeletonCreateEdits";
import * as yup from "yup";
import usePost from "../customHooks/usePost";
import { toast } from "react-toastify";
import useFetch from "../customHooks/useFetch";

const UserEdit = ({permission}) => {
const {id} = useParams()
  const navigate = useNavigate();
  const { loading, data } = useFetch(`roles`)
  const { loading2, data:data2 } = useFetch(`userEdit/${id}`)
  const [role, setRole] = useState("")

  const [datas, setDatas] = useState("")
  useEffect(() => {
    if (data) {
      setDatas(data?.data)
    }
  }, [data])
  const [imgPath, setImgPath] = useState();
  useEffect(() => {
    if (data2) {
        setImgPath(data2?.data?.profile_image)
        setRole(data2?.data?.role)
    }
  }, [data2])


  const [imgValue, setiImgValue] = useState();


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
  const requireFeild = ["name", "email","user_enabled"];
  const [res, apiMethod] = usePost();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Required"),
        password: yup.string().min(8, "Minimum 8 characters").max(20, "Maximum 20 characters"),
        password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmit = async (values) => {
    let emaill = data2?.data?.email
    let formdata = new FormData();
    let requireFeildSwal = {
      name: "Name",
      email: "Email",
      user_enabled: "Enabled",
    };
    let checkerRequried = [];
    for (const item in values) {
      if (requireFeild.includes(item) && values[item] === "") {
        checkerRequried.push(requireFeildSwal[item]);
      }
      if(item === "email") {
        }
    }
    formdata.append("name", values["name"]);
    formdata.append("email", emaill);
    console.log(values["user_enabled"])
    formdata.append("user_enabled",  values["user_enabled"].length > 0 ? 1 : 0);
    formdata.append("role_id", role);
    formdata.append("password", values["password"] ?? "");
    formdata.append("password_confirmation", values["password_confirmation"] ?? "");
    formdata.append("role_id", role);
    formdata.append("profile_image", imgValue ?? "");
    if (!imgValue && !imgPath) {
      checkerRequried.push("Profile Image");
    }
    if (!role) {
      checkerRequried.push("Role");
    }

    if (checkerRequried.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: checkerRequried.join(","),
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      apiMethod(`userUpdate/${id}`, formdata)
    }
  };
  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === false) {
        toast.error(message);
      }
      else {
        navigate("/users")
        toast.success(message);
      }
    }
  }, [res.data])


  if (!data2) return <SkeletonCreateEdits heading={"Edit User"} />
const datass = data2?.data
  let initialValues = {
    name: datass?.name ?? "",
    email: datass?.email ?? "",
    password: "",
    user_enabled: datass?.user_enabled === 1 ?["1"] : "",
  };

   const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='createTeam pr-10 max-lg:pr-6'>
      <Link to={"/users"} className="back flex items-center mb-5 gap-2">
        <img src={back} className='w-[2rem]' alt="" />
        <span className='text-[1.4rem] font-MluvkaBold'>Edit User</span>
      </Link>
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
                      name="name"
                      label={"Name"}
                      placeholder="Enter your Name"
                      className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                      control="input"
                      type="text"
                    />
                    <FormControl
                      name="email"
                      label={"User Email"}
                      placeholder="Enter your Email"
                      className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                      control="input"
                      type="email"
                      disabled={true}
                    />
                    <div className="inputBox mt-3">
                      <label  className="mb-1 block">Role </label>
                      <select value={role} onInput={(e) => setRole(e.target.value)} className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" name="role_id" id="">
                        <option value="">Role</option>
                        {Array.isArray(datas) && datas.map((item) => {
                          const { id, name } = item
                          return (
                            <option value={id} key={id}>{name}</option>
                          )
                        })}
                      </select>
                    </div>
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
                    {check("Users", "User Edit") && (
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

export default UserEdit
