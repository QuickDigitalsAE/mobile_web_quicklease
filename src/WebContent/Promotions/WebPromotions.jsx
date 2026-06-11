import React, { useContext, useEffect, useState } from 'react'
import { MainLanguageContext } from '../../context/MainLanguageContext';
import useGet from '../../customHooks/useGet';
import usePost from '../../customHooks/usePost';
import { toast } from 'react-toastify';
import swal from "sweetalert";
import { Form, Formik } from 'formik';
import FormControl from '../../components/form/FormControl';
import SubmitButton from '../../components/SubmitButton';
import SkeletonPromotions from './SkeletonPromotions';
import CKEditors from '../../components/form/CKEditors';
import OneImageUpload from '../../components/OneImageUpload';
import plus from '../../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';

const WebPromotions = ({permission}) => {
       const [imageLoader, setImageLoader] = useState(false)
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState(
        {
            "banner": "",
            "promotion_paragraph": "",
            "sec_faqs": [{
            "question": "",
            "answer": "",
        }]
        }
    )
    const [resget, apiMethodGet] = useGet()
    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`webContents/metadata/promotions/${mainLanguage}`);
        }
    }, [mainLanguage]);

    useEffect(() => {
        if (resget.data) {
            setDatas(resget?.data?.data)
        }
    }, [resget.data])

      const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
      };

    

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
            formdata.append(`translation[promotion_paragraph]`, datas?.promotion_paragraph ?? "");
            formdata.append(`banner`, datas?.banner_value ?? "");
                        const appendSectionData = (sectionKey, dataArray) => {
                if (Array.isArray(dataArray)) {
                    dataArray.forEach((item, index) => {
                        Object.entries(item).forEach(([key, value]) => {
                                formdata.append(`translation[${sectionKey}][${index}][${key}]`, value ?? "");
                        });
                    });
                }
            };
            [
                { key: "sec_faqs", data: datas.sec_faqs },
            ].forEach(({ key, data }) => appendSectionData(key, data));
            apiMethod(`webContents/metadata/promotions/${mainLanguage}`, formdata)
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
        const handleCkChange2 = (text, section, index, paragraph) => {
        setDatas(prevService => ({
            ...prevService,
            [section]: prevService[section].map((item, index2) =>
                index === index2 ? { ...item, [paragraph]: text } : item
            )
        }));
    }

    if (resget.isLoading || !resget.data) return <SkeletonPromotions />
    const initialValues = {
        meta_title: resget?.data?.data?.meta_title ?? "",
        meta_description: resget?.data?.data?.meta_description ?? "",
        banner_title: resget?.data?.data?.banner_title ?? "",
        sec_faqs_heading: resget?.data?.data?.sec_faqs_heading ?? "",
    }
const check = (module, action) => permission?.[module]?.includes(action);
 const {  sec_faqs } = datas;
    return (
        <section className='promotions'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                        <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                  
                    </div>

                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                        <FormControl name="banner_title" label={"banner Title"} placeholder="Enter banner Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <br />
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Promotions Details</div>
                        <CKEditors label={"Promotions Details"} data={datas?.promotion_paragraph} update={(text) => handleCkChange(text, "promotion_paragraph")} />            
            <div className='mt-4'>
              <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"Promotions"} />
              </div>
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
                                    {console.log(sec_faqs)}
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

export default WebPromotions