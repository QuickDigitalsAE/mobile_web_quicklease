import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import SubmitButton from '../components/SubmitButton'
import useGet from '../customHooks/useGet'
import { MainLanguageContext } from '../context/MainLanguageContext'
import usePost from '../customHooks/usePost'
import { toast } from 'react-toastify'
import OneImageUpload from '../components/OneImageUpload'
import swal from "sweetalert";
import { useNavigate, useParams } from 'react-router-dom'
import SkeletonCreateEdit from './SkeletonCreateEdit'

const EditBlogsSidebar = ({ permission }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageLoader, setImageLoader] = useState(false)
  const [resget, apiMethodGet] = useGet()
  const { mainLanguage } = useContext(MainLanguageContext);
  const [datas, setDatas] = useState({
    "banner_image": "",
  })

  useEffect(() => {
    apiMethodGet(`sidebarBanner/${mainLanguage}/${id}`)
  }, [mainLanguage]);

  useEffect(() => {
    if (resget.data) {
      setDatas(resget.data?.data)
    }
  }, [resget.data])

  const [res, apiMethod] = usePost();
  const requireFeild = ["title", "redirect_url"];
  const handleSubmit = async (values) => {
    if (imageLoader) {
      swal({
        title: "Wait a Few Second",
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      let requireFeildSwal = {
        title: "Title",
        redirect_url: "Redirect url",
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
        let formdata = new FormData();
        formdata.append(`title`, values["title"] ?? "");
        formdata.append(`redirect_url`, values["redirect_url"] ?? "");
        formdata.append(`banner_image`, datas?.banner_value ?? "");
        formdata.append(`status`, values["status"].length > 0 ? 1 : 0);
        //  formdata.append(`status`, 1);
        apiMethod(`sidebarBanner/en/${id}`, formdata)
      }
    }

  }

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === false) {
        toast.error(message);
      }
      else {
        navigate("/blogs/sidebar")
        toast.success(message);
      }
    }
  }, [res.data])

  if (resget.isLoading || !datas) return <SkeletonCreateEdit />

  const initialValues = {
    title: resget?.data?.data.title,
    redirect_url: resget?.data?.data.redirect_url,
    status: resget?.data?.data.status && [`${String(resget?.data?.data.status)}`],
  }
  const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='newscreate  '>
<Formik initialValues={initialValues} onSubmit={handleSubmit}  >
        <Form>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
            <FormControl name="title" label={"Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="redirect_url" label={"Redirect Url"} placeholder="Enter Redirect Url" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <div className='mt-4'>
              <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image</label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner_image} Update={setDatas} sec_value={"banner_value"} sec_image={"banner_image"} folder_name={"sidebar_images"} page_type={"sidebarBanner"} />
              </div>

              <div className="overflow-hidden relative pt-7 px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="status" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Blog sidebar  Status</span>
                </label>
              </div>
            </div>
          </div>
          {check("SidebarBanners", "SidebarBanners Edit") &&<SubmitButton
            props={{
              class: "btn bg-secondary text-white uppercase py-3  px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
              text: "Update",
            }}
            buttonLoading={res.isLoading}
          />}
          <br />
        </Form>
      </Formik>
    </div>
  )
}

export default EditBlogsSidebar
