import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import CKEditors from '../components/form/CKEditors'
import SubmitButton from '../components/SubmitButton'
import SkeletonPrivacyPolicy from './SkeletonPrivicyPolicy'
import useGet from '../customHooks/useGet'
import { MainLanguageContext } from '../context/MainLanguageContext'
import usePost from '../customHooks/usePost'
import { toast } from 'react-toastify'
import OneImageUpload from '../components/OneImageUpload'
import swal from "sweetalert";

const TermsAndConditions = ({permission}) => {
     const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/metadata/terms-and-condition/${mainLanguage}`)
    }, [mainLanguage]);
     const [datas, setDatas] = useState({
         "description":"",
         "banner":"",
     })

    useEffect(() => {
        if (resget.data) {
            setDatas(resget.data?.data)
        }
    }, [resget.data])



    const handleCkChange = (e) => {
        setDatas(d => ({ ...d, "description": e }));
      };


    const [res, apiMethod] = usePost();
    const handleSubmit = async (values) => {
        if (imageLoader) {
            swal({
                title: "Wait a Few Second",
                icon: "error",
                dangerMode: true,
            });
        }
        else {
            let formdata = new FormData();
            for (const item in values) {
                formdata.append(`translation[${item}]`, values[item] ?? "");
            }
            formdata.append(`translation[description]`, datas?.description ?? "");
            formdata.append(`banner`, datas?.banner_value ?? "");
            apiMethod(`webContents/metadata/terms-and-condition/${mainLanguage}`, formdata)
        }
        
    }
    
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

    if (resget.isLoading || !datas) return <SkeletonPrivacyPolicy />
    const {description} = datas
    const initialValues = {
        meta_title: resget?.data?.data.meta_title ?? "",
        meta_description: resget?.data?.data.meta_description ?? "",
        heading: resget?.data?.data.heading ?? "",
        heading_two: resget?.data?.data.heading_two ?? "",
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='TermsAndConditions'>
                 <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:gap-0'>
                                <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                             </div>
                        </div>

                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                            <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="heading_two" label={"Heading two"} placeholder="Enter Heading two" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <br />
                            <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">description</label>
                            <CKEditors label={"description"} data={description} update={handleCkChange} />

                            <div className='mt-4'>
              <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"Promotions"} />
              </div>
            </div>
                        </div>

                        {(check("WebContents", "WebContents Edit") &&
                                    <SubmitButton
                                        props={{
                                            class: "btn bg-secondary text-white uppercase py-3  px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                            text: "Update",
                                        }}
                                        buttonLoading={res.isLoading}
                                    />
                                )}
                                <br />
                </Form>
            </Formik>
        </div>
    )
}

export default TermsAndConditions