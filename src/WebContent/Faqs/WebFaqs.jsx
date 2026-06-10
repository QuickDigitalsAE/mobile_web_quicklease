import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
import plus from '../../dist/webImages/plus.svg'
import profile from "../../dist/webImages/profile.webp"
import camera from "../../dist/webImages/camera.svg"
import SkeletonFaqs from './SkeletonFaqs';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import usePost from '../../customHooks/usePost';
import useGet from '../../customHooks/useGet';
import { toast } from 'react-toastify';
import FormControl from '../../components/form/FormControl';
import SubmitButton from '../../components/SubmitButton';
import CKEditors from '../../components/form/CKEditors';
import OneImageUpload from '../../components/OneImageUpload';

const WebFaqs = ({ permission }) => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`webContents/faqs/${mainLanguage}`);
        }
    }, [mainLanguage]);


    const [datas, setDatas] = useState({
        faqs: []
    })
    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
        }
    }, [resget.data])


    const handlePlus = () => {
        const newFaq = {
            id: datas?.faqs.length + 1,
            question: "",
            answer: "",
        };

        setDatas((prevState) => ({
            ...prevState,
            faqs: [...prevState.faqs, newFaq]
        }));
    };
    const handleDelete = (index) => {
        swal({
            title: "Are you sure?",
            text: " you want to remove?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    setDatas((prevState) => ({
                        ...prevState,
                        faqs: prevState.faqs.filter((faq, i) => i !== index)
                    }));
                    swal("Successfully Delete", "", "success");
                }

            });
    }

    const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
    };
    const handleCkChange2 = (value, type, index) => {
        setDatas((prevState) => {
            const updatedsec_two = prevState.faqs.map((faq, i) =>
                i === index ? { ...faq, [type]: value } : faq
            );
            return { ...prevState, faqs: updatedsec_two };
        });
    };


    const [res, apiMethod] = usePost()
    const requireFeild = ["heading"];
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
                heading: "Heading",
            };
            let checkerRequried = [];
            for (const item in values) {
                if (requireFeild.includes(item) && values[item] === "") {
                    checkerRequried.push(requireFeildSwal[item]);
                }
                formdata.append(`translation[${item}]`, values[item]);
            }
            formdata.append(`translation[description]`, datas?.description);
            formdata.append(`banner`, datas?.banner_value ?? "");
            if (Array.isArray(datas?.faqs)) {
                for (let index = 0; index < datas?.faqs?.length; index++) {
                    formdata.append(`translation[faqs][${index}][question]`, datas?.faqs[index].question);
                    formdata.append(`translation[faqs][${index}][answer]`, datas?.faqs[index].answer);
                }
            }
            if (Array.isArray(datas?.faqs) === false) {
                checkerRequried.push("faqs")
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

                apiMethod(`webContents/faqs/${mainLanguage}`, formdata)
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
    if (resget.isLoading || !resget?.data?.data) return <SkeletonFaqs />

    const initialValues = {
        banner_title: resget?.data?.data?.banner_title,
        meta_title: resget?.data?.data?.meta_title,
        meta_description: resget?.data?.data?.meta_description,
        heading: resget?.data?.data?.heading,
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='faqsPage pr-10 max-lg:pr-6'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='grid grid-cols-1'>
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className='mt-4'>
                            <div>
                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"faqs"} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <FormControl name="banner_title" label={"Banner Title"} placeholder="Enter Banner Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        </div>
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Description</div>
                        <CKEditors label={"Description"} data={datas?.description} update={(text) => handleCkChange(text, "description")} />
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-4'>
                        <div className="faqsPageMain grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                            {
                                Array.isArray(datas?.faqs) && datas?.faqs.map((item, index) => {
                                    const { question, answer } = item
                                    return (
                                        <div className='bg-[#D4DEF1] p-5 rounded-3xl max-lg:p-3' key={index}>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                    <span>Question</span>
                                                    {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete(index)}>
                                                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>}
                                                </label>
                                                <div className='smallValue'>
                                                    <CKEditors label={"Description"} data={question} update={(text) => handleCkChange2(text, "question", index)} />
                                                </div>
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Answer</span> </label>
                                                <CKEditors label={"Answer"} data={answer} update={(text) => handleCkChange2(text, "answer", index)} />

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={handlePlus}>
                            <img src={plus} alt="plus" />
                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                        </div>
                    </div>
                    {check("WebContents", "WebContents Edit") &&<SubmitButton
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

export default WebFaqs
