import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import swal from "sweetalert";
import plus from '../../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import useGet from '../../customHooks/useGet';
import usePost from '../../customHooks/usePost';
import { toast } from 'react-toastify';
import CKEditors from '../../components/form/CKEditors';
import OneImageUpload from '../../components/OneImageUpload';
import OneImageUploadMultiple from '../../components/OneImageUploadMultiple';
import SkeletonProductInner from './SkeletonProductInner';
const ProductInner = ({permission}) => {
    const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/product-inner/${mainLanguage}`)
    }, [mainLanguage]);
    const [datas, setDatas] = useState()

    useEffect(() => {
        if (resget.data) {
            let datasss = resget.data?.data
            let locationsArray = []
            for (const key in resget.data?.data?.locations) {
                if (Object.prototype.hasOwnProperty.call(resget.data?.data?.locations, key)) {
                    const element = resget.data?.data?.locations[key];
                    locationsArray.push(element);
                }
            }
            datasss["locations"] = locationsArray
            setDatas(datasss)
        }
    }, [resget.data])





    const handleSectionAdd = (sectionKey, fields) => {
        const newEntry = Object.fromEntries(fields.map((field) => [field, ""]));

        setDatas((prevState) => ({
            ...prevState,
            [sectionKey]: [...(prevState[sectionKey] || []), newEntry],
        }));
    };
const handleSectionAdd2 = (sectionKey, newEntry) => {
  setDatas((prevState) => ({
    ...prevState,
    [sectionKey]: [...(prevState[sectionKey] || []), newEntry],
  }));
};

    const handleDelete = (section, index) => {
        setDatas(prevService => ({
            ...prevService,
            [section]: prevService[section].filter((item, index2) => index !== index2)
        }));
    }




    const handleInputChange2 = (e, section, index) => {
        const { name, value } = e.target;
        setDatas(prevService => ({
            ...prevService,
            [section]: prevService[section].map((item, index2) =>
                index === index2 ? { ...item, [name]: value } : item
            )
        }));
    }

    const handleCkChange2 = (text, section, index, paragraph) => {
        setDatas(prevService => ({
            ...prevService,
            [section]: prevService[section].map((item, index2) =>
                index === index2 ? { ...item, [paragraph]: text } : item
            )
        }));
    }

    const handleInputChange3 = (e, section, index) => {
        const { name, value } = e.target;
        setDatas(prevService => ({
            ...prevService,
            [section]: prevService[section].map((item, index2) =>
                index === index2 ? value : item
            )
        }));
    }






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
                formdata.append(`translation[${item}]`, values[item]);
            }

                for (let index = 0; index < datas?.document_requirements.length; index++) {
                    formdata.append(`translation[document_requirements][${index}][title]`, datas?.document_requirements[index]?.title);
                    formdata.append(`translation[document_requirements][${index}][image]`, datas?.document_requirements[index]?.imgValue ?? "");
                    formdata.append(`translation[document_requirements][${index}][description]`, datas?.document_requirements[index]?.description);
                }
                console.log(document_requirements)
                for (let index = 0; index < datas?.services.length; index++) {
                    formdata.append(`translation[services][]`, datas?.services[index] ?? "");
                }
                for (let index = 0; index < datas?.locations.length; index++) {
                    formdata.append(`translation[locations][]`, datas?.locations[index] ?? "");
                }
                
                
                formdata.append(`banner`, datas?.banner_value ?? "");
            apiMethod(`webContents/product-inner/${mainLanguage}`, formdata)
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

    if (resget.isLoading || !datas) return <SkeletonProductInner />
    const { document_requirements,services,locations } = datas
    const initialValues = {
        telephone_number:resget?.data?.data?.telephone_number,
        whatsapp:resget?.data?.data?.whatsapp
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='aboutPage pr-10 max-lg:pr-6'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="telephone_number" label={" Telephone Number"} placeholder="Enter Telephone Number" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="whatsapp" label={" whatsapp"} placeholder="Enter whatsapp" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                        <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"contectus"} />
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Document Requirements List</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("document_requirements", ["title", "image", "description"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(document_requirements) && document_requirements.map((item, index) => {
                                    const { title, description, image } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("document_requirements", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "document_requirements", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Description</label>
                                                <CKEditors label={"Description"} folder_name={"web_content_images"} page_type={"ProductInner"} data={description} update={(text) => handleCkChange2(text, "document_requirements", index, "description")} />
                                            </div>
                                            <div>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"document_requirements"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"ProductInner"} />
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Services</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd2("services")}  >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(services) && services.map((item, index) => {
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("services", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Values</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Values" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={item} onChange={(e) => handleInputChange3(e, "services", index)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">locations</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd2("locations")}  >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(locations) && locations.map((item, index) => {
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("locations", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Values</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Values" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={item} onChange={(e) => handleInputChange3(e, "locations", index)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                   {check("WebContents", "WebContents Edit") && <SubmitButton
                        props={{
                            class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                            text: "Submit",
                        }}
                        buttonLoading={res.isLoading}
                    />}
                </Form>
            </Formik>
        </div>
    )
}

export default ProductInner