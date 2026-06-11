import React, { useEffect, useState } from "react";
import profile from "../dist/webImages/profile.webp";
import camera from "../dist/webImages/camera.svg";
import swal from "sweetalert";
import FormControl from "../components/form/FormControl";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    <div className='createTeam user-create-page'>
      <div className='user-create-page__shell'>
        <div className={`TeamModel user-create-page__card transition-all duration-300 bg-white rounded-xl`} >
          <div className=" overflow-auto modelBox">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
              <Form name="myForm">
                <div className="TeamBox user-create-page__content p-5 rounded-xl">
                  <aside className="user-create-page__aside">
                    <span className="user-create-page__kicker">Profile Setup</span>
                    <h2>Refresh account details</h2>
                    <p>
                      Update identity, role, password, and status while keeping the user record consistent.
                    </p>
                    <div
                      className="user-create-page__avatarWrap"
                      onDrop={handleDrop}
                    >
                      <img
                        src={imgPath || profile}
                        className="user-create-page__avatar"
                        alt=""
                      />
                      <div className="TeamBoxinput user-create-page__avatarButton w-[2rem] h-[2rem] bg-[#C0CCE2] grid place-items-center rounded-full absolute right-[-1rem] top-[-1rem] cursor-pointer z-1">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <img src={camera} alt="camera" className="cursor-pointer" />
                      </div>
                    </div>
                    <div className="user-create-page__asideMeta">
                      <span>Replace the image only if the profile needs a new photo</span>
                      <strong>Email stays fixed for this account</strong>
                    </div>
                    <div className="user-create-page__asideNote">
                      <strong>Quick Note</strong>
                      <span>Leave password fields empty if you do not want to change the current login password.</span>
                    </div>
                  </aside>

                  <div className="form user-create-page__form mt-7">
                    <section className="user-create-page__section">
                      <div className="user-create-page__sectionHead">
                        <h3>Basic Information</h3>
                        <p>Review the account identity and assigned role.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 w-full">
                        <FormControl
                          name="name"
                          label={"Name"}
                          placeholder="Enter full name"
                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                          control="input"
                          type="text"
                        />
                        <FormControl
                          name="email"
                          label={"User Email"}
                          placeholder="Enter email address"
                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                          control="input"
                          type="email"
                          disabled={true}
                        />
                        <div className="inputBox mt-3">
                          <label className="mb-1 block">Role</label>
                          <select value={role} onInput={(e) => setRole(e.target.value)} className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg" name="role_id" id="role_id">
                            <option value="">Select role</option>
                            {Array.isArray(datas) && datas.map((item) => {
                              const { id, name } = item
                              return (
                                <option value={id} key={id}>{name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </section>

                    <section className="user-create-page__section">
                      <div className="user-create-page__sectionHead">
                        <h3>Security</h3>
                        <p>Update the password only when a reset is required.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 w-full">
                        <FormControl
                          name="password"
                          label="Password"
                          placeholder="Enter new password"
                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                          control="password"
                          type="password"
                        />

                        <FormControl
                          name="password_confirmation"
                          label="Confirm Password"
                          placeholder="Confirm new password"
                          className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                          control="password"
                          type="password"
                        />
                      </div>
                    </section>

                    <section className="user-create-page__section user-create-page__section--toggle">
                      <div className="user-create-page__toggleRow">
                        <div>
                          <h3>Account Status</h3>
                          <p>Enable or disable access without changing any other account details.</p>
                        </div>
                        <label className="user-create-page__switch" htmlFor="default-checkbox">
                          <Field name="user_enabled" id="default-checkbox" type="checkbox" value="1" className="sr-only peer" />
                          <span className="user-create-page__switchTrack"></span>
                          <span className="user-create-page__switchLabel">Enable</span>
                        </label>
                      </div>
                    </section>
                  </div>
                </div>
                <div className="user-create-page__actions">
                  <Link to="/users" className="user-create-page__cancel">
                    Cancel
                  </Link>
                  {check("Users", "User Edit") && (
                    <SubmitButton
                      props={{
                        class:
                          "user-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full block submit hover:bg-primary transition-all duration-300",
                        text: "Update User",
                      }}
                      buttonLoading={res.isLoading}
                    />
                  )}
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEdit
