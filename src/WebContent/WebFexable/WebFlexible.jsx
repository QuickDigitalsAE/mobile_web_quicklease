import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import CKEditors from '../../components/form/CKEditors'
import SubmitButton from '../../components/SubmitButton'
import useGet from '../../customHooks/useGet'
import { MainLanguageContext } from '../../context/MainLanguageContext'
import usePost from '../../customHooks/usePost'
import { toast } from 'react-toastify'
import OneImageUpload from '../../components/OneImageUpload'
import swal from "sweetalert";
import SkeletonFlexible from './SkeletonFlexible'
import { Link } from 'react-router-dom'
import OneImageUploadMultiple from '../../components/OneImageUploadMultiple'
import plus from '../../dist/webImages/plus.svg'

const WebFlexible = ({ permission }) => {
    const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/metadata/flexible-rentals/${mainLanguage}`)
    }, [mainLanguage]);
    const [datas, setDatas] = useState({
        "description": "",
        "banner": "",
    })

    useEffect(() => {
        if (resget.data) {
            setDatas(resget.data?.data)
        }
    }, [resget.data])



    const handleCkChange = (e, type) => {
        setDatas((d) => ({ ...d, [type]: e }));
    };

        const handleSectionAdd = (sectionKey, fields) => {
        const newEntry = Object.fromEntries(fields.map((field) => [field, ""]));

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


    const [res, apiMethod] = usePost();
    const requireFeild = [
        "meta_title",
        "meta_description ",
        "title",
    ];
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
            let requireFeildSwal = {
                meta_title: "Meta Title",
                meta_description: "Meta Description",
                title: "Heading",
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

                formdata.append(`translation[meta_title]`, values["meta_title"]);
                formdata.append(`translation[meta_description]`, values["meta_description"]);
                formdata.append(`translation[title]`, values["title"]);
                formdata.append(`translation[description]`, datas?.description ?? "");
                formdata.append(`translation[sec_one_description]`, datas?.sec_one_description ?? "");
                formdata.append(`translation[sec_two_description]`, datas?.sec_two_description ?? "");
                formdata.append(`translation[sec_one_heading]`, values?.sec_one_heading ?? "");
                formdata.append(`translation[sec_two_heading]`, values?.sec_two_heading ?? "");
                formdata.append(`translation[sec_faqs_heading]`, values?.sec_faqs_heading ?? "");
                formdata.append(`translation[testimonials_title]`, values?.testimonials_title ?? "");
                formdata.append(`banner_image`, datas?.banner_image_value ?? "");

                const appendSectionData = (sectionKey, dataArray) => {
                    if (Array.isArray(dataArray)) {
                        dataArray.forEach((item, index) => {
                            Object.entries(item).forEach(([key, value]) => {
                                const fieldValue = key === "image" ? item?.imgValue ?? ""
                                    : key === "slider_image" ? item?.slider_image_value ?? "" : value;
                                let aa = ["slider_image_value", "imgValue"]
                                if (aa.includes(key)) {

                                }
                                else {
                                    formdata.append(`translation[${sectionKey}][${index}][${key}]`, fieldValue ?? "");
                                }
                            });
                        });
                    }
                };
                [
                    { key: "sec_faqs", data: datas.sec_faqs },
                    { key: "sec_testimonials", data: datas.sec_testimonials },
                    { key: "sec_one", data: datas.sec_one },
                    { key: "sec_two", data: datas.sec_two },
                    { key: "banner", data: datas.banner },
                ].forEach(({ key, data }) => appendSectionData(key, data));
                apiMethod(`webContents/metadata/flexible-rentals/${mainLanguage}`, formdata);

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
                toast.success(message);
            }
        }
    }, [res.data])

    if (resget.isLoading || !datas) return <SkeletonFlexible />

    let initialValues = {
        meta_title: resget?.data?.data?.meta_title,
        meta_description: resget?.data?.data?.meta_description,
        title: resget?.data?.data?.title,
        description: resget?.data?.data?.description,
        sec_one_heading: resget?.data?.data?.sec_one_heading,
        sec_two_heading: resget?.data?.data?.sec_two_heading,
        sec_faqs_heading: resget?.data?.data?.sec_faqs_heading,
        testimonials_title: resget?.data?.data?.testimonials_title,
    };

    const check = (module, action) => permission?.[module]?.includes(action);
     const {  sec_one, sec_two, sec_faqs, description, sec_one_description, sec_two_description, sec_testimonials } = datas;
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
                        <FormControl name="title" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <label htmlFor="description" className="mb-1 block text-[#7D8CA7] text-[.8rem]">description</label>
                        <CKEditors label={"description"} data={description} update={(text) => handleCkChange(text, "description")} />

                        <div className='mt-4'>
                            <div>
                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"Promotions"} />
                            </div>
                        </div>
                    </div>


                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='flex justify-between'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_one", ["title", "description", "image"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <FormControl name="sec_one_heading" label={"Section 1 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <br />
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 1 Description</div>
                        <CKEditors label={"Description"} data={sec_one_description} update={(text) => handleCkChange(text, "sec_one_description")} />


                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_one) && sec_one.map((item, index) => {
                                    const { title, paragraph, image } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("sec_one", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox sec_oneHeading w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <CKEditors label={"title"} data={title} update={(text) => handleCkChange2(text, "sec_one", index, "title")} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_one", index, "paragraph")} />
                                            </div>
                                            <div className='mb-2'>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_one"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='flex justify-between'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_two", ["title", "description", "image"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <FormControl name="sec_two_heading" label={"Section 2 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <br />
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 2 Description</div>
                        <CKEditors label={"Description"} data={sec_two_description} update={(text) => handleCkChange(text, "sec_two_description")} />

                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_two) && sec_two.map((item, index) => {
                                    const { title, paragraph, image } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("sec_two", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_two", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_two", index, "paragraph")} />
                                            </div>
                                            <div className='mb-2'>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_two"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='flex justify-between'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Faqs</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_faqs", ["question", "answer"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <FormControl name="sec_faqs_heading" label={"Faqs Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                        <div className="section4Main grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_faqs) && sec_faqs.map((item, index) => {
                                    const { question, answer } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                    <span>Question</span>
                                                    {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete("sec_faqs", index)}>
                                                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>}
                                                </label>
                                                <div className='smallValue'>
                                                    <CKEditors label={"question"} data={question} update={(text) => handleCkChange2(text, "sec_faqs", index, "question")} />
                                                </div>
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Answer</span> </label>
                                                <CKEditors label={"Answer"} data={answer} update={(text) => handleCkChange2(text, "sec_faqs", index, "answer")} />

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='flex justify-between'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Testimonials</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_testimonials", ["question", "answer"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <FormControl name="testimonials_title" label={"Testimonials Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                        <div className="section4Main grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_testimonials) && sec_testimonials.map((item, index) => {
                                    const { message, name } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                    <span>Testimonials</span>
                                                    {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete("sec_testimonials", index)}>
                                                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>}
                                                </label>
                                                <div className="inputBox w-full mt-3">
                                                    <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                    <input name="name" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={name} onChange={(e) => handleInputChange2(e, "sec_testimonials", index)} />
                                                </div>
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Description</span> </label>
                                                <CKEditors label={"Description"} data={message} update={(text) => handleCkChange2(text, "sec_testimonials", index, "message")} />

                                            </div>
                                        </div>
                                    )
                                })
                            }
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

export default WebFlexible