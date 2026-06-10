import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import swal from "sweetalert";
import plus from '../../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import SkeletonAboutUs from './SkeletonAboutUs';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import useGet from '../../customHooks/useGet';
import usePost from '../../customHooks/usePost';
import { toast } from 'react-toastify';
import OneImageUpload from '../../components/OneImageUpload';
import OneImageUploadMultiple from '../../components/OneImageUploadMultiple';
import CKEditors from '../../components/form/CKEditors';
const AboutUs = ({ permission }) => {
    const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/aboutus/${mainLanguage}`)
    }, [mainLanguage]);
    const [datas, setDatas] = useState()

    useEffect(() => {
        if (resget.data) {
            setDatas(resget.data?.data)
        }
    }, [resget.data])





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


            const appendSectionData = (sectionKey, dataArray) => {
                if (Array.isArray(dataArray)) {
                    dataArray.forEach((item, index) => {
                        Object.entries(item).forEach(([key, value]) => {
                            const fieldValue = key === "image" ? item?.imgValue ?? "" : value;
                            let aa = ["imgValue"]
                            if (aa.includes(key)) {

                            }
                            else {
                                formdata.append(`translation[${sectionKey}][${index}][${key}]`, fieldValue);
                            }
                        });
                    });
                }
            };

            // Shortened usage for all sections
            [
                { key: "sec_one", data: datas.sec_one },
                { key: "sec_two", data: datas.sec_two },
                { key: "sec_three", data: datas.sec_three },
                { key: "sec_four", data: datas.sec_four },
                { key: "sec_faqs", data: datas.sec_faqs },
            ].forEach(({ key, data }) => appendSectionData(key, data));


            formdata.append(`banner`, datas?.banner_value ?? "");
            apiMethod(`webContents/aboutus/${mainLanguage}`, formdata)
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

    if (resget.isLoading || !datas) return <SkeletonAboutUs />
    const { sec_one, sec_two, sec_three, sec_four, sec_faqs } = datas
    const initialValues = {
        meta_title: resget?.data?.data.meta_title,
        meta_description: resget?.data?.data.meta_description,
        banner_heading: resget?.data?.data.banner_heading,
        sec_two_heading: resget?.data?.data.sec_two_heading,
        sec_two_description: resget?.data?.data.sec_two_description,
        sec_three_heading: resget?.data?.data.sec_three_heading,
        sec_four_heading: resget?.data?.data.sec_four_heading,
        sec_faqs_heading: resget?.data?.data.sec_faqs_heading,
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='aboutPage pr-10 max-lg:pr-6'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='grid grid-cols-1'>
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Banner </div>
                        <FormControl name="banner_heading" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div>
                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                            <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"about"} />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1 Card</div>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_one) && sec_one.map((item, index) => {
                                    const { title, image, paragraph } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_one", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_one", index)}></textarea>
                                            </div>
                                            <div>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_one"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"about"} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
                        <FormControl name="sec_two_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="sec_two_description" label={"Description"} placeholder="Enter description" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2 Card</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_two", ["image"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_two) && sec_two.map((item, index) => {
                                    const { image } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("sec_two", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_two"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"about"} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3</div>
                        <FormControl name="sec_three_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3 Card</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_three", ["image"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_three) && sec_three.map((item, index) => {
                                    const { title, image, paragraph } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_three", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_three", index)}></textarea>
                                            </div>
                                            <div>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                {
                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_three"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"about"} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4</div>
                        <FormControl name="sec_four_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4 Card</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_four", ["title", "paragraph"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(sec_four) && sec_four.map((item, index) => {
                                    const { title, paragraph } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_four", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_four", index)}></textarea>
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

export default AboutUs