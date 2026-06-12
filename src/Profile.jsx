import React, { useContext, useEffect, useState } from "react";
import profile from "./dist/webImages/profile.webp";
import camera from "./dist/webImages/camera.svg";
import swal from "sweetalert";
import FormControl from "./components/form/FormControl";
import { Field, Form, Formik } from "formik";
import SubmitButton from "./components/SubmitButton";
import { Link } from 'react-router-dom';
import { MainLanguageContext } from "./context/MainLanguageContext";
import useGet from "./customHooks/useGet";
import usePost from "./customHooks/usePost";
import { toast } from "react-toastify";
import * as yup from "yup";
import { MainProfileContext } from "./context/MainProfileContext";
import SkeletonCreateEdits from "./Users/SkeletonCreateEdits";

const Profile = () => {
    const { profileData } = useContext(MainProfileContext);
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState("")
    const { mainLanguage } = useContext(MainLanguageContext);
    const [resget, apiMethodGet] = useGet()

    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`roles`);
        }
    }, [mainLanguage]);
    const [imgValue, setiImgValue] = useState();
    const [imgPath, setImgPath] = useState();
    useEffect(() => {
        if (profileData) {
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
    const requireFeild = ["username", "email", "user_enabled"];
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
            if (item !== "user_enabled") {
                formdata.append(item, values[item]);
            }
        }
        formdata.append("user_enabled", values["user_enabled"]?.length > 0 ? 1 : 0);
        formdata.append("role_id", role);
        formdata.append("profile_image", imgValue ?? "");
        if (!imgPath) {
            checkerRequried.push("Profile Image");
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
        user_enabled: profileData?.user_enabled === 1 ? user_enabled : [],
    };
    return (
        <div className='createTeam user-create-page'>
            <div className='user-create-page__shell'>
                <div className='TeamModel user-create-page__card transition-all duration-300 bg-white rounded-xl'>
                    <div className="overflow-auto modelBox">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
                            <Form name="myForm">
                                <div className="TeamBox user-create-page__content p-5 rounded-xl">
                                    <aside className="user-create-page__aside">
                                        <span className="user-create-page__kicker">Account Profile</span>
                                        <h2>Manage your professional profile</h2>
                                        <p>
                                            Update your identity, access details, and account status from one polished workspace designed for quick review.
                                        </p>
                                        <div
                                            className="user-create-page__avatarWrap"
                                            onDrop={handleDrop}
                                        >
                                            <img
                                                src={imgPath || profile}
                                                className="user-create-page__avatar"
                                                alt="Profile"
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
                                            <span>Upload a clear square image for the admin header and profile menu.</span>
                                            <strong>Recommended: 512 x 512</strong>
                                        </div>
                                        <div className="user-create-page__asideNote">
                                            <strong>Quick Note</strong>
                                            <span>Leave password fields empty if you do not want to change the current password.</span>
                                        </div>
                                    </aside>

                                    <div className="form user-create-page__form mt-7">
                                        <section className="user-create-page__section">
                                            <div className="user-create-page__sectionHead">
                                                <h3>Basic Information</h3>
                                                <p>Keep your visible account details accurate and aligned with your current role.</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 w-full">
                                                <FormControl
                                                    name="username"
                                                    label={"User Name"}
                                                    placeholder="Enter your name"
                                                    className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                                    control="input"
                                                    type="text"
                                                />
                                                <FormControl
                                                    name="email"
                                                    label={"User Email"}
                                                    placeholder="Enter your email"
                                                    className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                                    control="input"
                                                    type="email"
                                                    disabled={profileData?.role_id === 1}
                                                />
                                                {profileData?.role_id !== 1 ? (
                                                    <div className="inputBox mt-3">
                                                        <label htmlFor="role_id" className="mb-1 block">Role</label>
                                                        <select
                                                            id="role_id"
                                                            value={role}
                                                            onInput={(e) => setRole(e.target.value)}
                                                            className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                                                            name="role_id"
                                                        >
                                                            <option value="">Select role</option>
                                                            {Array.isArray(datas) && datas.map((item) => {
                                                                const { id, name } = item
                                                                return (
                                                                    <option value={id} key={id}>{name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <div className="user-create-page__asideNote mt-3">
                                                        <strong>Primary Admin</strong>
                                                        <span>This account uses a fixed role and email configuration.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <section className="user-create-page__section">
                                            <div className="user-create-page__sectionHead">
                                                <h3>Security</h3>
                                                <p>Refresh your password only when you want to rotate credentials.</p>
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

                                        <section className="user-create-page__section user-create-page__section--toggle mt-4">
                                            <div className="user-create-page__toggleRow">
                                                <div>
                                                    <h3>Account Status</h3>
                                                    <p>Keep this enabled if the account should stay active for dashboard access.</p>
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
                                    <Link to="/" className="user-create-page__cancel">
                                        Back
                                    </Link>
                                    <SubmitButton
                                        props={{
                                            class:
                                                "user-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full block submit hover:bg-primary transition-all duration-300",
                                            text: "Update Profile",
                                        }}
                                        buttonLoading={res.isLoading}
                                    />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
