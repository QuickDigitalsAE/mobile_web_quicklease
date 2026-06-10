import React, {  useContext, useEffect, useState } from 'react';
import back from "../dist/webImages/back.svg";
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import { toast } from 'react-toastify';
import usePost from '../customHooks/usePost';
import swal from "sweetalert";
import profile from "../dist/webImages/profile.webp"
import camera from "../dist/webImages/camera.svg"
import dayjs from "dayjs"
import usePost2 from '../customHooks/usePost2';
import { MainUserDataContext } from '../context/MainUserDataContext';

const CreateBlogs = ({permission}) => {
  const navigate = useNavigate();
        const { userdata } = useContext(MainUserDataContext);
  const [loading, setLoading] = useState(true)
  const [datas, setDatas] = useState({
    "blog_image": "",
    social: [
      {
        title: "",
        image: "",
        ink: "",
      }
    ]
  })






  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);




  let initialValues = {
    meta_title: "",
    meta_description: "",
    blog_slug: "",
    blog_title: "",
    blog_image_alt: "",
    blog_status: ["1"],
    table_of_content: "",
    blog_schedule: dayjs().format("YYYY-MM-DDTHH:mm"),
  };


  const [res2, apiMethod2] = usePost();
  const [imageLoader, setImageLoader] = useState(false)
  const handleFileUpload = (e, type, value) => {
    setImageLoader(true)
    let formdata = new FormData();
    const file = e.target.files[0];
    if (file) {
      let path = (window.URL || window.webkitURL).createObjectURL(file);
      setDatas((prevState) => ({
        ...prevState, [type]: path,
      }));

      formdata.append(`image`, file);
      formdata.append(`folder_name`, "blogs_images");
      formdata.append(`page_type`, "blogs");
      apiMethod2(`innerPages/uploadImage`, formdata)

    }
  }

  useEffect(() => {
    if (res2.data) {
      const { status, message, data } = res2?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        setDatas((prevState) => ({
          ...prevState, ["blog_value"]: data?.image_path
        }));
        setImageLoader(false)
      }
    }
  }, [res2.data])
  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };



  const handleDrop = (e, type, value) => {
    e.preventDefault();
    let formdata = new FormData();
    if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
      let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
      setDatas((prevState) => ({
        ...prevState, [type]: path
      }));
      formdata.append(`image`, e.dataTransfer.files[0]);
      formdata.append(`folder_name`, "blogs_images");
      formdata.append(`page_type`, "blogs");
      apiMethod2(`innerPages/uploadImage`, formdata)
    }
    else {
      swal("Only use Image", "", "warning");
    }
  };







  const [res, apiMethod] = usePost2();
  const requireFeild = ["meta_title", "meta_description", "blog_title", "blog_slug ", "blog_schedule"];
  const handleSubmit = async (values) => {
    if(imageLoader) {
      swal({
        title: "Wait a Few Second",
        icon: "error",
        dangerMode: true,
      });
    }
    else {

      // let formdata = new FormData();
      let requireFeildSwal = {
        meta_title: "Meta title",
        meta_description: "Meta Description",
        blog_title: "Title",
        blog_slug: "slug",
        blog_schedule: "Schedule",
      };
      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
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

   const updateData =  {
          "blog_image":  datas?.blog_value ?? "",
          "blog_slug": values["blog_slug"],
          "blog_image": datas?.blog_value ?? "",
          "blog_status": values["blog_status"].length > 0 ? 1 : 1,
          "blog_schedule": `${values["blog_schedule"].replace("T", " ")}` ?? "",
          "table_of_content": values["table_of_content"].length > 0 ? 1 : 0,
          "translation": {
            "meta_title": values["meta_title"],
            "meta_description": values["meta_description"],
            "blog_title": values["blog_title"],
            "blog_image_alt": values["blog_image_alt"],
            "blog_paragraph": datas?.blog_paragraph
          }
        }

        apiMethod(`blogs/create/en`, updateData)
      }
    }
  };

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        navigate(`/blogs/edit/${res?.data?.data?.blog_id}`)
        toast.success(message);
      }
    }
  }, [res.data])
  if (loading) return <SkeletonCreateEdit heading={"Create Blogs"} />;
  const { blog_paragraph } = datas;
 const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='newscreate pr-10 max-lg:pr-6'>
      <Link to={"/blogs"} className="back flex items-center mb-6 gap-2">
        <img src={back} className='w-[2rem]' alt="" />
        <span className='text-[1.4rem] font-MluvkaBold'>Create Blogs</span>
      </Link>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form name="myForm">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
            <div className="grid grid-cols-2 gap-2">
              <FormControl name="blog_slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
              <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
            <div className="grid  gap-2">
              <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Blog</div>
            <FormControl name="blog_title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <br />

            <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Main Paragraph</div>
            <CKEditors label={"Main Paragraph"} folder_name={"blogs_images"} page_type={"blogs"} data={blog_paragraph} update={(text) => handleCkChange(text, "blog_paragraph")} />

            <div className='mt-4'>
           {imageLoader ?
            <div className=' h-[10rem] w-full relative bg-[#fff] grid place-items-center'>
                <div className="TeamBoxinput w-[3rem] h-[3rem] grid place-items-center">
                <div role="status " className="">
    <svg  className="w-10 h-10 ml-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>
                </div>
            </div>

           :
           
           <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image </label>
                <div className=' h-[10rem] relative' onDrop={(e) => handleDrop(e, "blog_image", "blog_value")}>
                  {datas?.blog_image ?
                    <img src={datas?.blog_image || profile} className='w-full h-full rounded-3xl object-cover ' alt="" />
                    :
                    <div className='w-full h-full  rounded-3xl object-cover  bg-white'></div>
                  }
                  <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                    <input type="file" onChange={(e) => handleFileUpload(e, "blog_image", "blog_value")} className='absolute inset-0 opacity-0 cursor-pointer' />
                    <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                  </div>
                </div>
              </div>}
            </div>
            <FormControl name="blog_image_alt" label={"Heading Image Alt"} placeholder="Enter Blog Image Alt" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
           
            <div className='relative'>
              <FormControl name="blog_schedule" label={"Schedule"} type={'datetime-local'} placeholder="Enter Schedule" className="outline-none mmonth w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>

            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="blog_status" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">Blog Status</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="table_of_content" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">Table of Content</span>
              </label>
            </div>
          </div>
          <SubmitButton
            props={{
              class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
              text: "Submit",
            }}
            buttonLoading={res.isLoading}
          />
        </Form>
      </Formik>
    </div>
  )
}

export default CreateBlogs
