import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import swal from 'sweetalert';
import plus from '../dist/webImages/plus.svg'
import UpdateButton from '../components/UpdateButton';
import SkeletonFaqs from './SkeletonFaqs';
const Faqs = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const initialValues = {
        email: "",
        password: "",
    }
    const [datas, setDatas] = useState({
        "faqlist": [
            {
                id: 1,
                question: "What types of cases does your firm handle?",
                answer: "Our firm specializes in a variety of practice areas including personal injury, family law, criminal defense, business law, employment law, real estate law, and estate planning.",
            },
            {
                id: 2,
                question: "What types of cases does your firm handle?",
                answer: "Our firm specializes in a variety of practice areas including personal injury, family law, criminal defense, business law, employment law, real estate law, and estate planning.",
            },
            {
                id: 3,
                question: "What types of cases does your firm handle?",
                answer: "Our firm specializes in a variety of practice areas including personal injury, family law, criminal defense, business law, employment law, real estate law, and estate planning.",
            },
            {
                id: 4,
                question: "What types of cases does your firm handle?",
                answer: "Our firm specializes in a variety of practice areas including personal injury, family law, criminal defense, business law, employment law, real estate law, and estate planning.",
            },
        ]
    })
    const { faqlist } = datas;
    const handleChange = (id, value, type) => {
        setDatas((prevState) => {
            const updatedFaqList = prevState.faqlist.map((faq) =>
                faq.id === id ? { ...faq, [type]: value } : faq
            );
            return { ...prevState, faqlist: updatedFaqList };
        });
    };
    const handlePlus = () => {
        const newFaq = {
            id: faqlist.length + 1,
            question: "",
            answer: "",
        };

        setDatas((prevState) => ({
            ...prevState,
            faqlist: [...prevState.faqlist, newFaq]
        }));
    };
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    setDatas((prevState) => ({
                        ...prevState,
                        faqlist: prevState.faqlist.filter(faq => faq.id !== id)
                    }));
                    swal("Successfully Delete", "", "success");
                }

            });
    }
    if (loading) return <SkeletonFaqs />
    return (
        <div className='faqsPage  '>
            <Formik initialValues={initialValues}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-4'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                        <div className='flex items-end gap-4 max-lg:flex-col max-lg:gap-0'>
                            <FormControl name="sheading" label={"Short Heading"} placeholder="Enter Short Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        </div>

                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-4'>
                        <div className="faqsPageMain grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                            {
                                faqlist.map((item, index) => {
                                    const { id, question, answer } = item
                                    return (
                                        <div className='bg-[#D4DEF1] p-5 rounded-3xl max-lg:p-3' key={id}>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                    <span>Question</span>
                                                    {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete(id)}>
                                                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>}
                                                </label>
                                                <input type="text" value={question} className='outline-none w-full h-[3rem] px-5 rounded-xl' placeholder='Question' onChange={(e) => handleChange(id, e.target.value, "question")} />
                                            </div>
                                            <div className=''>
                                                <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Answer</span> </label>
                                                <textarea name="" value={answer} className='outline-none w-full h-[10rem] border border-[#CFD5E2] px-5 py-3 resize-none rounded-2xl' placeholder='Answer' onChange={(e) => handleChange(id, e.target.value, "answer")}></textarea>

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

                    <UpdateButton loading={false} className='btn bg-secondary text-white px-16 uppercase   py-3 rounded-full w-100 block my-5 ml-auto submit hover:bg-primary transition-all duration-300' label={"Update"} />
                </Form>
            </Formik>
        </div>
    )
}

export default Faqs
