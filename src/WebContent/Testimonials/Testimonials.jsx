import React, { useContext, useEffect, useState } from 'react'
import { MainLanguageContext } from '../../context/MainLanguageContext';
import SkeletonTestimonials from './SkeletonTestimonials';
import useGet from '../../customHooks/useGet';
import usePost from '../../customHooks/usePost';
import { toast } from 'react-toastify';
import swal from "sweetalert";
import { Form, Formik } from 'formik';
import FormControl from '../../components/form/FormControl';
import SubmitButton from '../../components/SubmitButton';
import OneImageUpload from '../../components/OneImageUpload';

const Testimonials = ({permission}) => {
        const [imageLoader, setImageLoader] = useState(false)
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState(
        {
            "banner": ""
        }
    )
    const [resget, apiMethodGet] = useGet()
    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`webContents/metadata/testimonials/${mainLanguage}`);
        }
    }, [mainLanguage]);

    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
        }
    }, [resget.data])
    const [res, apiMethod] = usePost()
    const requireFeild = ["meta_title", "meta_description", "banner_title"];

    const handleSubmit = (values) => {
        if (imageLoader) {
            swal({
                title: "Wait a Few Second",
                icon: "error",
                dangerMode: true,
            });
        }
        else {
        let formdata = new FormData();
        let requireFeildSwal = {
            meta_title: "Meta Title",
            meta_description: "Meta Description",
            banner_title: "banner_title",
        };
        let checkerRequried = [];
        for (const item in values) {
            if (requireFeild.includes(item) && values[item] === "") {
                checkerRequried.push(requireFeildSwal[item]);
            }
            formdata.append(`translation[${item}]`, values[item] ?? "");
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
            formdata.append(`banner`, datas?.banner_value ?? "");
            apiMethod(`webContents/metadata/testimonials/${mainLanguage}`, formdata)
        }
    }
    }

    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data
            if (status === "false") {
                toast.error(message);
            }
            else {
                toast.success(message);
            }
        }
    }, [res.data])

    if (resget.isLoading || !resget.data) return <SkeletonTestimonials />
    const initialValues = {
        meta_title: resget?.data?.data?.meta_title ?? "",
        meta_description: resget?.data?.data?.meta_description ?? "",
        banner_title: resget?.data?.data?.banner_title ?? "",
    }
const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <section className='Testimonials'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                        <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                  
                    </div>

                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                        <FormControl name="banner_title" label={"banner Title"} placeholder="Enter banner Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='mt-4'>
              <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"testimonials"} />
              </div>
            </div>
                    </div>
                  

                    {(check("WebContents", "WebContents Edit") &&
                        <SubmitButton
                            props={{
                                class: "btn bg-secondary text-white uppercase py-3 px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                text: "Update",
                            }}
                            buttonLoading={res.isLoading}
                        />
                    )}
                    <br />
                </Form>
            </Formik>
        </section>
    )
}

export default Testimonials