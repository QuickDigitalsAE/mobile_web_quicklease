import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import CKEditors from '../../components/form/CKEditors'
import SubmitButton from '../../components/SubmitButton'
import useGet from '../../customHooks/useGet'
import { MainLanguageContext } from '../../context/MainLanguageContext'
import usePost from '../../customHooks/usePost'
import { toast } from 'react-toastify'
import OneImageUpload from '../../components/OneImageUpload'
import swal from "sweetalert";
import SkeletonVehicleBooking from './SkeletonVehicleBooking'
import FormControl from '../../components/form/FormControl'

const VehicleBooking = ({permission}) => {
        const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/metadata/vehicle-booking/${mainLanguage}`)
    }, [mainLanguage]);
    const [datas, setDatas] = useState({
        "policies":"",
        "accept_terms":"",
        "valid_driving_license":"",
        // "valid_passport":"",
        "description":"",
        "banner":"",
    })

    useEffect(() => {
        if (resget.data) {
            setDatas(resget.data?.data)
        }
    }, [resget.data])



    const handleCkChange = (e,type) => {
        setDatas(d => ({ ...d, [type]: e }));
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
            formdata.append(`translation[policies]`, datas?.policies ?? "");
            formdata.append(`translation[accept_terms]`, datas?.accept_terms ?? "");
            formdata.append(`translation[valid_driving_license]`, datas?.valid_driving_license ?? "");
            // formdata.append(`translation[valid_passport]`, datas?.valid_passport ?? "");
            formdata.append(`banner`, datas?.banner_value ?? "");
            apiMethod(`webContents/metadata/vehicle-booking/${mainLanguage}`, formdata)
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

    if (resget.isLoading || !datas) return <SkeletonVehicleBooking />
    const {description,policies,valid_passport,valid_driving_license,accept_terms} = datas
    const initialValues = {
        meta_title: resget?.data?.data.meta_title ?? "",
        meta_description: resget?.data?.data.meta_description ?? "",
        heading: resget?.data?.data.heading ?? "",
        heading_two: resget?.data?.data.heading_two ?? "",
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='VehicleBooking'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                <div className='bg-[#EFF4FD] p-6 rounded-3xl  mb-8'>
                            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:gap-0'>
                                <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                             </div>
                        </div>

                        <div className='bg-[#EFF4FD] p-6  CKEditorsHeight rounded-3xl mb-8'>
                            <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="heading_two" label={"Heading two"} placeholder="Enter Heading two" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <br />
                            <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">description</label>
                            <CKEditors label={"description"} data={description} update={(e) => handleCkChange(e,"description")} />
                            <br />
                            <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Policies</label>
                            <CKEditors label={"policies"} data={policies} update={(e) => handleCkChange(e,"policies")} />
                            <br />
                            <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">accept terms</label>
                            <textarea className='w-full outline-0' label={"accept_terms"} value={accept_terms} onChange={(e) => handleCkChange(e.target.value,"accept_terms")} ></textarea>
                            <br />
                            <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">valid driving license</label>
                            <textarea className='w-full outline-0' label={"valid_driving_license"} value={valid_driving_license} onChange={(e) => handleCkChange(e.target.value,"valid_driving_license")} ></textarea>
                            <br />
                             {/* <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">valid passport</label> */}
                            {/* <textarea className='w-full outline-0' label={"valid_passport"} value={valid_passport} onChange={(e) => handleCkChange(e.target.value,"valid_passport")} ></textarea> */}

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

export default VehicleBooking